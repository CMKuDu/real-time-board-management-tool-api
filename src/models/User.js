class User {
  constructor(data) {
    this.id = data.id;
    this.email = data.email;
    this.username = data.username;
    this.displayName = data.displayName || data.username;
    this.avatar = data.avatar;
    this.provider = data.provider || 'local'; // 'local', 'github', 'firebase'
    this.providerId = data.providerId; // GitHub ID, Firebase UID, etc.
    this.isActive = data.isActive !== undefined ? data.isActive : true;
    this.lastLoginAt = data.lastLoginAt;
    this.createdAt = data.createdAt || new Date();
    this.updatedAt = data.updatedAt || new Date();
  }

  static fromGitHubUser(githubUser) {
    return new User({
      email: githubUser.email,
      username: githubUser.login,
      displayName: githubUser.name || githubUser.login,
      avatar: githubUser.avatar_url,
      provider: 'github',
      providerId: githubUser.id.toString(),
      lastLoginAt: new Date()
    });
  }

  toJSON() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      displayName: this.displayName,
      avatar: this.avatar,
      provider: this.provider,
      isActive: this.isActive,
      lastLoginAt: this.lastLoginAt,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  }

  toTokenPayload() {
    return {
      id: this.id,
      email: this.email,
      username: this.username,
      provider: this.provider
    };
  }
}

module.exports = User;