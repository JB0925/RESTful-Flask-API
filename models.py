from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

def connect_db(app):
    db.app = app
    db.init_app(app)


class Cupcake(db.Model):

    __tablename__ = 'cupcakes'

    id = db.Column(db.Integer, autoincrement=True, primary_key=True)
    flavor = db.Column(db.String(50), nullable=False)
    size = db.Column(db.String(50), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    image = db.Column(db.String, default='https://tinyurl.com/demo-cupcake')


    def __repr__(self) -> str:
        return f'Cupcake(id={self.id}, flavor={self.flavor}, size={self.size}, rating={self.rating}, image={self.image})'
    

    def serialize(self):
        return {
            "id": self.id,
            "flavor": self.flavor,
            "size": self.size,
            "rating": str(self.rating),
            "image": self.image
        }








