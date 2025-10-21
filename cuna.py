import requests
from pydub import AudioSegment
from gtts import gTTS
import os

# === TEXTO DE LA CUÑA ===
texto = ("En porencargo punto co trabajamos Día y Noche para entregar su carga a tiempo y sin contratiempo. "
         "Porencargo punto co, la forma más segura de enviar su carga.")

# === GENERAR VOZ CON gTTS (Google Text to Speech) ===
voz = gTTS(text=texto, lang="es", tld="com", slow=False)
voz.save("voz.mp3")

# === DESCARGAR JINGLE Y MÚSICA LIBRE DE DERECHOS ===
jingle_url = "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"   # ejemplo libre
musica_url = "https://files.freemusicarchive.org/storage-freemusicarchive-org/music/no_curator/Scott_Holmes_Music/Corporate__Motivational_Music/Scott_Holmes_Music_-_Upbeat_Party.mp3"

if not os.path.exists("jingle.mp3"):
    with open("jingle.mp3", "wb") as f:
        f.write(requests.get(jingle_url).content)

if not os.path.exists("musica.mp3"):
    with open("musica.mp3", "wb") as f:
        f.write(requests.get(musica_url).content)

# === CARGAR PISTAS ===
voz_audio = AudioSegment.from_mp3("voz.mp3")
jingle = AudioSegment.from_mp3("jingle.mp3")[:3000]  # primeros 3 seg del jingle
musica = AudioSegment.from_mp3("musica.mp3") - 12    # bajar volumen de música

# === MEZCLAR ===
# unir jingle + voz con música de fondo
cuña = jingle + voz_audio
cuña = musica.overlay(cuña, loop=True)

# === EXPORTAR ===
cuña.export("spot_porencargo.mp3", format="mp3", bitrate="320k")
print("✅ Cuña exportada como spot_porencargo.mp3")
