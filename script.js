document.getElementById('githubForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('githubInput').value;
    const apiUrl = `https://api.github.com/users/${username}`;

    fetch(apiUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('User not found');
            }
            return response.json();
        })
        .then(data => {
            document.getElementById('userData').innerHTML = `
                <img src="${data.avatar_url}" alt="Avatar">
                <div class="user-info">
                    <h2>${data.name ? data.name : 'No Name Available'}</h2>
                    <p>${data.bio ? data.bio : 'No Bio Available'}</p>
                    <p><strong>Public Repos:</strong> ${data.public_repos}</p>
                    <p><strong>Followers:</strong> ${data.followers}</p>
                    <p><strong>Following:</strong> ${data.following}</p>
                    <a href="${data.html_url}" target="_blank">View Profile on GitHub</a>
                </div>
            `;
        })
        .catch(error => {
            document.getElementById('userData').innerHTML = `<p>${error.message}. Please try again!</p>`;
        });
});
