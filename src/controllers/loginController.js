const Login = require('../models/LoginModel');

exports.index = (req, res) => {
    if(req.session.user) return res.render('login-logado')
    console.log(req.session.user)
    
  return res.render('login', { user: req.session.user });
}

exports.register = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.register();
    
    console.log('Erros de validação:', login.errors);

    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save()
      return;
    }

    req.flash('success', 'seu usuário foi criado com sucesso');
      req.session.save()
      return;
} catch(e) {
    console.log(e)
    return res.render('404');
}
};

exports.login = async function(req, res) {
  try {
    const login = new Login(req.body);
    await login.login();

    console.log('Erros de validação:', login.errors);

    
    if (login.errors.length > 0) {
      req.flash('errors', login.errors);
      req.session.save(() => res.redirect('/login/index'));
      return;
    }

    req.flash('success', 'logado com sucesso');
    req.session.user = login.user;
    console.log('usuario logado', login.user)
    req.session.save(() => res.redirect('/login/index'));
      return;
} catch(e) {
    console.log(e)
    return res.render('404');
}
};

exports.logout = function(req, res) {
    req.session.destroy();
    console.log('usuario destruido', req.session)
    res.redirect('/')
}
