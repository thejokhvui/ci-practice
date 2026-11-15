variable "aws_region" {
  description = "Регіон AWS"
  type        = string
  default     = "us-east-1"
}

variable "ami_id" {
  description = "ID образу Ubuntu 22.04 для цього регіону"
  type        = string
}

variable "instance_type" {
  description = "Тип EC2 інстансу"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Назва key pair в AWS"
  type        = string
}

variable "private_key_path" {
  description = "Шлях до .pem ключа для SSH (його вміст іде в GitHub secret)"
  type        = string
  default     = "~/.ssh/nodeapp-key.pem"
}
