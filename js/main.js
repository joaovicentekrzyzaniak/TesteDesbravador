$(document).ready(function() {
    $('#buscarUsuario').on('click', function(e) {
        let username = $("#nomeUsuario").val();

        $.ajax({
            url: 'https://api.github.com/users/' + username,
            data: {
                client_id: '7a4d1048b1d4fb84e7e5',
                client_secret: 'ebe990d5b51a2c6c251cf85f5f35aa36db6dcb3a'
            }
        }).done(function(user) {
            $.ajax({
                url: 'https://api.github.com/users/' + username + '/repos',
                data: {
                    client_id: '7a4d1048b1d4fb84e7e5',
                    client_secret: 'ebe990d5b51a2c6c251cf85f5f35aa36db6dcb3a',
                }
            }).done(function(repos) {
                var dataSet = [];
                $.each(repos, function(index, repo) {
                    dataSet.push([repo.name, repo.description, repo.stargazers_count, repo.language, repo.html_url]);
                });

                $('#repos').dataTable({
                    data: dataSet,
                    columns: [{
                            title: "Nome",
                            data: function(data, type, row, meta) {
                                return '<a target="_blank" href="' + data[data.length - 1] + '">' + data[0] + '</a>';
                            }
                        },
                        {
                            title: "Descrição"
                        },
                        {
                            title: "Estrelas"
                        },
                        {
                            title: "Linguagem"
                        }
                    ],
					columnDefs: [
						{ responsivePriority: 1, targets: 2 },
						{ responsivePriority: 2, targets: 3 },
					],
                    searching: false,
                    bLengthChange: false,
                    language: {
                        url: "//cdn.datatables.net/plug-ins/1.10.15/i18n/Portuguese-Brasil.json"
                    },
                    order: [
                        [2, "desc"]
                    ],
					responsive: true
                });
            });
			
            $('#profile').html(`
        <div class="panel panel-default">
          <div class="panel-heading">
            <h3 class="panel-title">${user.name}</h3>
          </div>
          <div class="panel-body">
            <div class="row">
              <div class="col-md-3">
                <img class="thumbnail avatar" src="${user.avatar_url}">
              </div>
              <div class="col-md-9">
              <span class="label label-default">Seguidores: ${user.followers}</span>
              <span class="label label-default">Seguindo: ${user.following}</span>
              <br><br>
              <ul class="list-group">
                <li class="list-group-item">E-mail: ${user.email}</li>
                <li class="list-group-item">Bio: ${user.bio}</li>
              </ul>
              </div>
            </div>
          </div>
        </div>
        <h3 class="page-header">Repositórios</h3>
        <table id="repos" class="table table-striped table-bordered dt-responsive nowrap" cellspacing="0" width="100%"></table>
      `);
        });
    });
});