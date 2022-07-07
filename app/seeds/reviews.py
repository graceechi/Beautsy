from app.models import db, Review
from datetime import datetime

def seed_reviews():
    review1 = Review(
        review='', user_id=1, product_id=1,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review2 = Review(
        review='', user_id=1, product_id=2,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review3 = Review(
        review='', user_id=1, product_id=12,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review4 = Review(
        review='', user_id=1, product_id=13,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review5 = Review(
        review='', user_id=2, product_id=14,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review6 = Review(
        review='', user_id=2, product_id=22,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review7 = Review(
        review='', user_id=3, product_id=25,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review8 = Review(
        review='', user_id=3, product_id=34,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review9 = Review(
        review='', user_id=4, product_id=45,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review10 = Review(
        review='', user_id=5, product_id=49,
        created_at=datetime.now(), updated_at=datetime.now()
    )


    db.session.add(review1)
    db.session.add(review2)
    db.session.add(review3)
    db.session.add(review4)
    db.session.add(review5)
    db.session.add(review6)
    db.session.add(review7)
    db.session.add(review8)
    db.session.add(review9)
    db.session.add(review10)

    db.session.commit()

def undo_reviews():
    db.session.execute('TRUNCATE reviews RESTART IDENTITY CASCADE;')
    db.session.commit()
