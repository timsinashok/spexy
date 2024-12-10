FROM python:3.9
WORKDIR /spexy-backend
COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt
COPY . .
# Use the dynamic PORT environment variable (Cloud Run expects this to be 8080 by default)
ENV PORT 8080
# Expose the dynamic port to allow Cloud Run to bind the service
EXPOSE $PORT
# Use shell form to properly expand the PORT environment variable
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT}
