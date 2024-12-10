<<<<<<< HEAD
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
=======
# Use Python base image
FROM python:3.9
# Set working directory (assuming /app, but you might have something different!)
WORKDIR /spexy-backend
# Copy requirements file
COPY /requirements.txt .
# Install dependencies
RUN pip install --no-cache-dir -r requirements.txt
# Copy all backend files
COPY . .
# Expose port
EXPOSE 8000
# Start FastAPI server (this should be exactly what you do when working locally)
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
>>>>>>> 299df58 (updated with bug fixes and api endpoint)
