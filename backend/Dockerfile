# Use an official Python runtime as a parent image
FROM python:3.9-slim

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# Set the working directory in the container
WORKDIR /app

# Copy the current directory contents into the container at /app
COPY . /app/

# Install any needed packages specified in requirements.txt
RUN pip install --upgrade pip && pip install -r requirements.txt

# Expose port 8000 to the outside world
EXPOSE 8000

# Run gunicorn when the container launches
CMD ["gunicorn", "backend.wsgi:application", "-b", "0.0.0.0:8000"]
