from app.models import db, Category

def seed_categories():
    skin = Category(name="Skin")
    body = Category(name="Body")
    hair = Category(name="Hair")
    makeup = Category(name="Makeup")
    man = Category(name="Man")

    db.session.add(skin)
    db.session.add(body)
    db.session.add(hair)
    db.session.add(makeup)
    db.session.add(man)

    db.session.commit()


def undo_categories():
    db.session.execute('TRUNCATE categories RESTART IDENTITY CASCADE;')
    db.session.commit()
