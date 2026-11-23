import json

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.views.decorators.http import require_http_methods

from .models import Album


@csrf_exempt
@require_http_methods(["GET", "POST"])
def api_album(request):
    if request.method == "GET":
        albuns = list(Album.objects.values())
        return JsonResponse(albuns, safe=False)

    try:
        dados = json.loads(request.body or "{}")
        titulo = str(dados.get("titulo", "")).strip()
        artista = str(dados.get("artista", "")).strip()
        ano = dados.get("ano")
        avaliacao = dados.get("avaliacao", dados.get("avaliação"))

        if not titulo or not artista or not ano or avaliacao is None:
            return JsonResponse({"erro": "Preencha título, artista, data e avaliação."}, status=400)

        novo_album = Album.objects.create(
            titulo=titulo,
            artista=artista,
            ano=ano,
            avaliação=float(avaliacao),
        )
        return JsonResponse({
            "id": novo_album.id,
            "titulo": novo_album.titulo,
            "artista": novo_album.artista,
            "ano": novo_album.ano.isoformat(),
            "avaliacao": novo_album.avaliação,
        }, status=201)
    except (json.JSONDecodeError, TypeError, ValueError):
        return JsonResponse({"erro": "Os dados enviados são inválidos."}, status=400)
