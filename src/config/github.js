class GitHubConfig {
  constructor() {
    this.clientId = process.env.GITHUB_CLIENT_ID;
    this.clientSecret = process.env.GITHUB_CLIENT_SECRET;
    this.redirectUri = process.env.GITHUB_REDIRECT_URI;
    
    if (!this.clientId || !this.clientSecret) {
      throw new Error('GitHub OAuth configuration missing. Please check GITHUB_CLIENT_ID and GITHUB_CLIENT_SECRET in .env');
    }
  }

  getAuthUrl(state = null) {
    const params = new URLSearchParams({
      client_id: this.clientId,
      redirect_uri: this.redirectUri,
      scope: 'user:email',
      state: state || this.generateState()
    });

    return `https://github.com/login/oauth/authorize?${params.toString()}`;
  }

  generateState() {
    return require('crypto').randomBytes(16).toString('hex');
  }
}

module.exports = new GitHubConfig();