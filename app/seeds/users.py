from app.models import db, User


# Adds a demo user, you can add other users here if you want
def seed_users():
    demo = User(
        username='Demo', email='demo@aa.io', password='password', full_name='Demo User', address='100 West Coast Hwy Suite 202, Newport Beach, CA 92663')
    grace = User(
        username='grace', email='grace@aa.io', password='password', full_name='Grace Chi', address='9515 N Lamar Blvd Suite 230, Austin, TX 78753')
    molly = User(
        username='molly', email='molly@aa.io', password='password', full_name='Molly Sparks', address='229 W 28th St, New York, NY 10001')
    daniel = User(
        username='daniel', email='daniel@aa.io', password='password', full_name='Daniel Lee', address='1530 Post Alley, Seattle, WA 98101')
    tommy = User(
        username='tommy', email='tommy@aa.io', password='password', full_name='Tommy Fisher', address='23220 Grand Cir Blvd Ste 130, Katy, TX 77450')
    ryan = User(
        username='ryan', email='ryan@aa.io', password='password', full_name='Ryan Kim', address='6702 N Cedar Ave #103, Fresno, CA 93710')


    db.session.add(demo)
    db.session.add(grace)
    db.session.add(molly)
    db.session.add(daniel)
    db.session.add(tommy)
    db.session.add(ryan)

    db.session.commit()


def undo_users():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
