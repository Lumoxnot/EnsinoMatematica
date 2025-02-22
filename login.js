"use strict";

document.addEventListener('DOMContentLoaded', function() {
  // Cadastro
  const formCadastro = document.getElementById('formCadastro');
  formCadastro.addEventListener('submit', function(event) {
      event.preventDefault();

      const nomeCadastro = document.getElementById('nomeCadastro').value;
      const senhaCadastro = document.getElementById('senhaCadastro').value;
      const gmail = document.getElementById('gmail').value;
      const telefone = document.getElementById('telefone').value;

      // Armazenar os dados no LocalStorage
      localStorage.setItem('usuario', nomeCadastro);
      localStorage.setItem('senha', senhaCadastro);
      localStorage.setItem('gmail', gmail);
      localStorage.setItem('telefone', telefone);

      alert('Cadastro realizado com sucesso!');
      document.getElementById('cadastro').style.display = 'none';  // Esconde o cadastro
      document.getElementById('login').style.display = 'block';    // Mostra o formulário de login
  });

  // Login
  const formLogin = document.getElementById('formLogin');
  formLogin.addEventListener('submit', function(event) {
      event.preventDefault();

      const nomeLogin = document.getElementById('nomeLogin').value;
      const senhaLogin = document.getElementById('senhaLogin').value;

      // Verificar se o usuário e a senha estão corretos
      const usuarioArmazenado = localStorage.getItem('usuario');
      const senhaArmazenada = localStorage.getItem('senha');

      if (nomeLogin === usuarioArmazenado && senhaLogin === senhaArmazenada) {
          window.location.href = 'index.html';  // Redireciona para a página 2
      } else {
          alert('Usuário ou senha incorretos!');
      }
  });
});

function showLogin() {
    document.getElementById('cadastro').style.display = 'none';
    document.getElementById('login').style.display = 'block';
}

function showCadastro() {
    document.getElementById('login').style.display = 'none';
    document.getElementById('cadastro').style.display = 'block';
}
