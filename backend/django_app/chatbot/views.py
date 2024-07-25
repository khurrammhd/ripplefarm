from rest_framework.response import Response
from rest_framework.views import APIView

from chatbot.agents import get_bot_response
from chatbot.utils import save_question_to_session


# test
class AskChatbotView(APIView):
    def post(self, request, format=None):
        question = request.data.get("question")
        answer = get_bot_response(question)
        save_question_to_session(request, question, answer)
        return Response(answer)
