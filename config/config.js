exports.DATABASE_URL = process.env.DATABASE_URL ||
                       global.DATABASE_URL ||
                      'mongodb://localhost/pivo-check';
exports.PORT = process.env.PORT || 3001;
exports.jwtSecret = 'pivoSecret';
