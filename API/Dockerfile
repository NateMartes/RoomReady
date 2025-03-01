FROM python:3.10-slim

COPY . .

RUN pip install --no-cache-dir -r requirements.txt

EXPOSE 8080

CMD ["fastapi", "run", "main.py", "--port", "8080"]
