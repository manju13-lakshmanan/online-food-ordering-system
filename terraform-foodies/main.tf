provider "aws" {
  region = "ap-south-1"
}

resource "aws_instance" "foodies_server" {
  ami           = "ami-0f58b397bc5c1f2e8"
  instance_type = "t3.micro"

  tags = {
    Name = "foodies-terraform-server"
  }
}

resource "aws_s3_bucket" "foodies_bucket" {
  bucket = "foodies-project-storage-2026"
}

output "instance_id" {
  value = aws_instance.foodies_server.id
}

output "bucket_name" {
  value = aws_s3_bucket.foodies_bucket.bucket
}
