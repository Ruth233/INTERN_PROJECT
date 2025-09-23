<?php
declare(strict_types=1);

use PDO;

$pdo = new PDO('mysql:host=localhost;dbname=intern_mgmt;charset=utf8mb4', 'root', '');
$pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

$username = 'admin';
$password = 'ChangeMe123!';
$hash = password_hash($password, PASSWORD_DEFAULT);

$pdo->exec('CREATE TABLE IF NOT EXISTS admin_users (
  id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(64) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB');

$stmt = $pdo->prepare('INSERT INTO admin_users (username, password_hash) VALUES (?, ?) ON DUPLICATE KEY UPDATE password_hash = VALUES(password_hash)');
$stmt->execute([$username, $hash]);

echo "Admin seeded. Username: $username Password: $password\n";


