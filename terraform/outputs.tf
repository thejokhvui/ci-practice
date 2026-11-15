output "instance_ip" {
  description = "Публічний IP сервера (для секрету EC2_HOST)"
  value       = aws_instance.nodeapp.public_ip
}

output "ssh_command" {
  description = "Команда для підключення по SSH"
  value       = "ssh -i ${var.private_key_path} ubuntu@${aws_instance.nodeapp.public_ip}"
}
