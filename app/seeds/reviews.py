from app.models import db, Review
from datetime import datetime

def seed_reviews():
    review1 = Review(
        review="I didn't grow up with a routine so at 44 I'm definitely noticing some lines and wrinkles. I've added these to routine and have noticed a reduction in lines. Has a light smell and glides on nicely and doesn't pull. Will purchase again.", user_id=1, product_id=1,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review2 = Review(
        review="I love using this after I wash my face to add some moisture to my skin care! I have dry/sensitive skin and I haven't had an issue with any breakouts from using it.", user_id=1, product_id=2,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review3 = Review(
        review="Love these scrubs, and this is no exception. Makes your skin feel so soft and great to use before shaving. This is definitely my favorite scent I've tried so far- I'm not even a huge fan of coconut normally but I love this scent!! Such a perfect scent for summer.", user_id=1, product_id=12,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review4 = Review(
        review="This did absolutely nothing went through an entire container and literally did not a thing. I got the citrus smell and it was still scentless. Giant waste. Save your money.", user_id=1, product_id=13,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review5 = Review(
        review="Love this product. I spray it on a make up brush and apply it to my face as a bronzer. Works very nicely, not heavy, doesn't clog pores. Nice glow", user_id=2, product_id=14,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review6 = Review(
        review="It'll clean your hair, but it seemed so watery. Didn't lather well, felt like I needed more than one pump to get all of my hair and I didn't see any difference in hair growth after finishing one bottle. Won't buy again.", user_id=2, product_id=22,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review7 = Review(
        review="I love how lightweight this heat/uv protective primer. It leaves my hair soft and shiny without being greasy. I definitely need the frizz control and UV protection in the Southern California sun. Overall loving this product and smells great too. I received this complimentary from Bumble and Bumble and will be purchasing when I run out!", user_id=3, product_id=25,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review8 = Review(
        review="This is ok, but you could buy a $5 mascara for the same effect. I wouldn't repurchase.", user_id=3, product_id=34,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review9 = Review(
        review="I've been using Acqua for years. I love the smell. It used to be you put on a couple of sprays and you smelled good all day. The last three bottles I bought, not exaggerating, I can put on 20 sprays and you can't even smell it unless someone hugs you and puts their nose right on your neck. I spray it on my face, neck and all over my shirt and no smell. Is Armani going cheap on us?", user_id=4, product_id=45,
        created_at=datetime.now(), updated_at=datetime.now()
    )
    review10 = Review(
        review="Easy to apply and stayed on well into the night. Great at keeping my lips moist.", user_id=5, product_id=49,
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
