from app.models import db, Product


# Adds a demo user, you can add other users here if you want
def seed_products():
    products = [
        # SKIN = 1
        {
            "name": "Retinol Correxion Capsules, Anti-Aging Night Retinol Face Serum Anti-Wrinkle Treatment",
            "image_url": "https://media.ulta.com/i/ulta/2560712?w=720",
            "description": "Support healthy collagen with RoC Retinol Correxion Line Smoothing Night Serum Capsules. A potent overnight renewal treatment in a single-dose capsule, sealed tight for optimal freshness. Clinically proven to revitalize skin while you sleep.",
            "price": 32.99,
            "category_id": 1
        },
        {
            "name": "Hyaluronic Acid 2% + B5 Hydrating Serum",
            "image_url": "https://media.ulta.com/i/ulta/2551164?w=720",
            "description": "Hyaluronic Acid 2% + B5 from The Ordinary is a lightweight water-based serum formulated with a combination of low, medium, and high molecular-weight hyaluronic acid, and a hyaluronic acid crosspolymer for multi-depth hydration.",
            "price": 7.50,
            "category_id": 1
        },
        {
            "name": "Glass Skin Refining Serum",
            "image_url": "https://media.ulta.com/i/ulta/2532640?w=720",
            "description": "Peach & Lily's No. 1 Bestseller, Glass Skin Refining Serum, visibly brightens, firms, hydrates & calms. Clean, effective, silky, weightless formula.",
            "price": 39.00,
            "category_id": 1
        },
        {
            "name": "Brightening Treatment Drops Triple Vitamin C Serum",
            "image_url": "https://media.ulta.com/i/ulta/2571148?w=720",
            "description": "TULA Brightening Treatment Drops Triple Vitamin C Serum: Two types of Vitamin C take on dull skin & help treat the look of dark spots, while the third reactivates the others through the day to protect against elements that cause the look of lackluster skin.",
            "price": 48.00,
            "category_id": 1
        },
        {
            "name": "Hydrating Hyaluronic Acid Serum",
            "image_url": "https://media.ulta.com/i/ulta/2540675?w=720",
            "description": "CeraVe Hydrating Hyaluronic Acid Serum provides 24-hour hydration for dry skin and instantly smoother skin while reinforcing the skin barrier with ceramides.",
            "price": 22.99,
            "category_id": 1
        },
        {
            "name": "Green Tea Blend Detox Mask",
            "image_url": "https://media.ulta.com/i/ulta/2530380?w=720",
            "description": "Reveal your skins true, natural glow! Teami Blends mineral-rich Green Tea Detox Mask will be a must-have in your self-care routine!",
            "price": 30.00,
            "category_id": 1
        },
        {
            "name": "Facial Spray with Aloe, Cucumber and Green Tea",
            "image_url": "https://media.ulta.com/i/ulta/2515878?w=720",
            "description": "Mario Badescu's Facial Spray With Aloe, Cucumber and Green Tea invigorates dull, tired skin with an infusion of botanical extracts and cucumber and peppermint essential waters. This facial mist delivers a cooling boost of hydration that leaves skin feeling refreshed and revitalized.",
            "price": 12.00,
            "category_id": 1
        },
        {
            "name": "AHA/BHA Clarifying Treatment Toner",
            "image_url": "https://media.ulta.com/i/ulta/2504908?w=720",
            "description": "COSRX AHA/BHA Clarifying Treatment Toner is formulated with AHA, BHA, and purifying botanical ingredients. The AHA/BHA Clarifying Treatment Toner works to soothe, refresh and soften the skin.",
            "price": 20.00,
            "category_id": 1
        },
        {
            "name": "Low pH Good Morning Gel Cleanser",
            "image_url": "https://media.ulta.com/i/ulta/2517358?w=720",
            "description": "COSRX Low pH Good Morning Gel Cleanser is an ultra-gentle face wash formulated with pore-purifying ingredients that gently rinse away impurities.",
            "price": 14.00,
            "category_id": 1
        },
        {
            "name": "Deep Cleansing Oil",
            "image_url": "https://media.ulta.com/i/ulta/2544323?w=720",
            "description": "DHC Deep Cleansing Oil is the original Japanese oil cleanser that removes makeup and dissolves impurities, leaving your skin clean, soft and radiant.",
            "price": 29.00,
            "category_id": 1
        },
        #  BODY = 2
        {
            "name": "Strawberry Shea Sugar Scrub",
            "image_url": "https://media.ulta.com/i/ulta/2593100?w=720",
            "description": "Reveal glowing skin with Tree Hut Shea Sugar Body Scrub in the delectable scent of Strawberry. Made with sugar, shea butter, BHA, strawberry and an array of natural oils including evening primrose, avocado, macadamia, sweet almond, safflower and orange oils.",
            "price": 10.49,
            "category_id": 2
        },
        {
            "name": "Coco Colada Shea Sugar Scrub",
            "image_url": "https://media.ulta.com/i/ulta/2542716?w=720",
            "description": "Experience an intense exfoliation and reveal soft, glowing skin with the bright, summer scent of Coco Colada! Made with Sugar, Shea Butter, Pineapple and an array of natural oils like Coconut, Evening Primrose, Avocado, Macadamia, Sweet Almond, Safflower and Orange Oils.",
            "price": 10.49,
            "category_id": 2
        },
        {
            "name": "Advanced Body Repair Treatment",
            "image_url": "https://media.ulta.com/i/ulta/2541559?w=720",
            "description": "Crépe Erase Advanced Body Repair Treatment features exclusive TruFirm Complex and signature 9 Super Hydrators. Dry, crépey skin is left visibly smooth, firm and touchably soft.",
            "price": 79.00,
            "category_id": 2
        },
        {
            "name": "Self Tan Purity Bronzing Water Face Mist",
            "image_url": "https://media.ulta.com/i/ulta/2522748?w=720",
            "description": "Achieve a natural sunkissed glow and instant hydration boost all year round in just one application of the lightweight and tropically scented St. Tropez Purity Face Tan Mist. This clean and clear facial mist is the easiest to use self tanner yet.",
            "price": 30.00,
            "category_id": 2
        },
        {
            "name": "Amazing Grace Perfumed Shampoo, Shower Gel & Bubble Bath",
            "image_url": "https://media.ulta.com/i/ulta/2153939?w=720",
            "description": "Philosophy's Amazing Grace Shampoo, Shower Gel & Bubble Bath is an award-winning shower gel with the amazingly clean, beautifully feminine scent.",
            "price": 28.00,
            "category_id": 2
        },
        {
            "name": "Tea Tree Foot Peeling Spray",
            "image_url": "https://media.ulta.com/i/ulta/2577827?w=720",
            "description": "The Tea Tree Foot Peeling Spray from Earth Therapeutics is an innovative mist that gently removes dead skin cells to exfoliate and create smoother skin and baby soft feet. Infused with healing tea tree oil, this mist is an easy to use, quick foot care therapy with excellent drying time.",
            "price": 12.00,
            "category_id": 2
        },
        {
            "name": "Tea Tree Moisturizing Foot Oil",
            "image_url": "https://media.ulta.com/i/ulta/2561248?w=720",
            "description": "Earth Therapeutics Tea Tree Moisturizing Foot Oil can be used as either as a foot massage oil to refresh tired, achy feet or as a bath infusion to help sooth dry rough feet after a hard day. Infused with healing tea tree oil and enriched with certified organic botanicals.",
            "price": 13.00,
            "category_id": 2
        },
        {
            "name": "Mineral Mattescreen SPF 40",
            "image_url": "https://media.ulta.com/i/ulta/2589388?w=720",
            "description": "Supergoop! Mineral Mattescreen SPF 40 is a 100% mineral formula with broad spectrum protection that smooths your skin's appearance and minimizes the look of pores, leaving behind a soft-focus, matte finish.",
            "price": 38.00,
            "category_id": 2
        },
        {
            "name": "KP Bump Eraser Body Scrub with 10% AHA",
            "image_url": "https://media.ulta.com/i/ulta/2559067?w=720",
            "description": "First Aid Beauty's KP Bump Eraser Body Scrub with 10% AHA is a body scrub with chemical and physical exfoliators that reveals healthier looking skin.",
            "price": 30.00,
            "category_id": 2
        },
        {
            "name": "SA Lotion For Rough & Bumpy Skin",
            "image_url": "https://media.ulta.com/i/ulta/2559621?w=720",
            "description": "CeraVe SA Lotion For Rough & Bumpy Skin has a lightweight formula that exfoliates and moisturizes while helping to restore the protective skin barrier and smooth skin.",
            "price": 71899,
            "category_id": 2
        },
        #  HAIR = 3
        {
            "name": "Perfect hair Day (PhD) Dry Shampoo",
            "image_url": "https://media.ulta.com/i/ulta/2562499?w=720",
            "description": "Living Proof Perfect hair Day (PhD) Dry Shampoo actually cleans hair, removing dirt, oil and odor for hair that looks, feels and smells clean.",
            "price": 41.00,
            "category_id": 3
        },
        {
            "name": "Hair Growth Shampoo",
            "image_url": "https://media.ulta.com/i/ulta/2564047?w=720",
            "description": "The Hair Growth Shampoo that has everyone talking! BondiBoost Hair Growth Shampoo has an Australian made power-packed formula that was engineered to intuitively target and transform hair while being free from parabens, sulphates and DEA agents.",
            "price": 29.95,
            "category_id": 3
        },
        {
            "name": "No.3 Hair Perfector",
            "image_url": "https://media.ulta.com/i/ulta/2591014?w=720",
            "description": "OLAPLEX No.3 Hair Perfector is a global bestselling at-home treatment, not a conditioner, that reduces breakage and visibly strengthens hair, improving its look and feel. It will restore your hair's healthy appearance and texture by repairing damage and protecting hair structure.",
            "price": 30.00,
            "category_id": 3
        },
        {
            "name": "No.7 Bonding Oil",
            "image_url": "https://media.ulta.com/i/ulta/2591018?w=720",
            "description": "OLAPLEX No.7 Bonding Oil is a highly-concentrated, weightless reparative styling oil that dramatically increases shine, softness, and color vibrancy. No.7 minimizes flyaways and frizz, while providing UV/heat protection of up to 450°F/232°C.",
            "price": 30.00,
            "category_id": 3
        },
        {
            "name": "Hairdresser's Invisible Oil Heat/UV Protective Primer",
            "image_url": "https://media.ulta.com/i/ulta/2516141?w=720",
            "description": "Bumble and bumble's Hairdresser's Invisible Oil Primer is a leave-in treatment defrizzes, detangles, protects and conditions dry, coarse, or brittle hair.",
            "price": 30.00,
            "category_id": 3
        },
        {
            "name": "Tea Tree Shaping Cream",
            "image_url": "https://media.ulta.com/i/ulta/2149035?w=720",
            "description": "Get hair into shape with Paul Mitchell Tea Tree Shaping Cream. The styling cream forms hair with texture, definition and long-lasting hold.",
            "price": 22.00,
            "category_id": 3
        },
        {
            "name": "Advanced Climate Control Frizz Fighting Touch-Up Balm",
            "image_url": "https://media.ulta.com/i/ulta/2593313?w=720",
            "description": "Ouidad's Advanced Climate Control Frizz Fighting Touch-Up Balm tames frizz on the go. The hydrating formula works to smooth curls and edges, and refresh definition.",
            "price": 22.00,
            "category_id": 3
        },
        {
            "name": "Perfect Shine Clarifying Scalp Scrub",
            "image_url": "https://media.ulta.com/i/ulta/2564029?w=720",
            "description": "The NatureLab. Tokyo Perfect Shine Clarifying Scalp Scrub is a gentle foaming sugar scrub with probiotic rich sake water. Gently removes product build up and environmental impurities.",
            "price": 17.00,
            "category_id": 3
        },
        {
            "name": "Perfect Smooth Conditioner",
            "image_url": "https://media.ulta.com/i/ulta/2564031?w=720",
            "description": "NatureLab. Tokyo's Perfect Smooth Conditioner has potent Argan Stem Cells that stimulate hair follicles to produce healthier, shinier hair.",
            "price": 15.00,
            "category_id": 3
        },
        {
            "name": "Perfect Repair Conditioner",
            "image_url": "https://media.ulta.com/i/ulta/2564022?w=720",
            "description": "NatureLab. Tokyo's Perfect Repair Conditioner is an antioxidant-rich plant-based conditioning treatment that shields hair from further UV and thermal damage",
            "price": 15.00,
            "category_id": 3
        },
        #  MAKEUP = 4
        {
            "name": "Tartelette 2 In Bloom Clay Eyeshadow Palette",
            "image_url": "https://media.ulta.com/i/ulta/2293234?w=720",
            "description": "Get your shadow skills bloomin' with Tarte's cult-favorite Tartelette In Bloom eyeshadow palette packed with everyday essential shades!",
            "price": 42.00,
            "category_id": 4
        },
        {
            "name": "Sun Bunny Natural Bronzer",
            "image_url": "https://media.ulta.com/i/ulta/2526210?w=720",
            "description": "Too Faced Sun Bunny Natural Bronzer is a dual-shaded bronzer with a subtle pink undertone that mimics the flush of a real tan and natural glow.",
            "price": 35.00,
            "category_id": 4
        },
        {
            "name": "Afterglow Lip Shine Gloss",
            "image_url": "https://media.ulta.com/i/ulta/2591163?w=720",
            "description": "NARS Afterglow Lip Shine is a comfortable lip gloss formula that effortlessly glides on mirror-like shine and hydrates lips for up to eight hours.",
            "price": 26.00,
            "category_id": 4
        },
        {
            "name": "Lash Idôle Lash-Lifting & Volumizing Mascara",
            "image_url": "https://media.ulta.com/i/ulta/2567763?w=720",
            "description": "Lancôme Lash Idôle Lash-Lifting & Volumizing Mascara is a mascara that targets and volumizes every single lash for instant lash lift, length, and fanned out volume with no clumps.",
            "price": 27.00,
            "category_id": 4
        },
        {
            "name": "All Nighter Long-Lasting Makeup Setting Spray",
            "image_url": "https://media.ulta.com/i/ulta/2503490?w=720",
            "description": "The award-winning Urban Decay All Nighter Long-Lasting Makeup Setting Spray keeps makeup fresh, smudge-proof, and transfer-resistant for up to 16 hours.",
            "price": 33.00,
            "category_id": 4
        },
        {
            "name": "Everyday Eye Essentials Makeup Brush and Sponge Set",
            "image_url": "https://media.ulta.com/i/ulta/2534700?w=720",
            "description": "The Real Techniques Everyday Essentials Set is a go-to for pro-styled looks. Use with foundation, concealer, blush, highlighter, and shadow makeup.",
            "price": 19.99,
            "category_id": 4
        },
        {
            "name": "Born This Way Undetectable Medium-to-Full Coverage Foundation",
            "image_url": "https://media.ulta.com/i/ulta/2290021?w=720",
            "description": "Too Faced Born This Way Undetectable Medium-to-Full Coverage Foundation is an oil-free foundation that offers a flawless match and a perfect finish.",
            "price": 45.00,
            "category_id": 4
        },
        {
            "name": "Killawatt Freestyle Highlighter",
            "image_url": "https://media.ulta.com/i/ulta/2592606?w=720",
            "description": "The FENTY BEAUTY by Rihanna Killawatt Foil Freestyle Highlighter is a lightweight, longwear cream-powder hybrid highlighter that ranges from subtle dayglow to insanely supercharged in solos and expertly paired duos.",
            "price": 38.00,
            "category_id": 4
        },
        {
            "name": "GrandeLASH-MD Lash Enhancing Serum (6 Month Supply)",
            "image_url": "https://media.ulta.com/i/ulta/2587633?w=720",
            "description": "Promote the appearance of naturally longer, thicker looking lashes in 4-6 weeks with full improvement in 3 months, with GrandeLASH-MD Lash Enhancing Serum by Grande Cosmetics.",
            "price": 125.00,
            "category_id": 4
        },
        {
            "name": "Stay All Day Waterproof Liquid Eyeliner",
            "image_url": "https://media.ulta.com/i/ulta/2215097?w=720",
            "description": "Stila's Stay All Day Waterproof Liquid Eye Liner glides on with ease, won't smudge or run, and stays in place until you say when!",
            "price": 23.00,
            "category_id": 4
        },
        #  MAN = 5
        {
            "name": "Beard Lube Conditioning Shave",
            "image_url": "https://media.ulta.com/i/ulta/2238595?w=720",
            "description": "Jack Black's Beard Lube Conditioning Shave is a translucent formula that functions as a pre-shave oil, shave cream, and an after-shave conditioner.",
            "price": 35.00,
            "category_id": 5
        },
        {
            "name": "Clinique For Men Face Wash",
            "image_url": "https://media.ulta.com/i/ulta/2271621?w=720",
            "description": "Clinique For Men Face Wash is a gentle yet thorough cleanser for normal to dry skin types.",
            "price": 23.00,
            "category_id": 5
        },
        {
            "name": "Scalp & Hair Leave-In Treatment System 2 (Fine/Progressed Thinning, Natural Hair)",
            "image_url": "https://media.ulta.com/i/ulta/2235066?w=720",
            "description": "Nioxin Scalp & Hair Leave-In Treatment System 2 (Fine/Progressed Thinning, Natural Hair) is a professional thickening scalp and hair leave-in treatment for natural hair with progressed thinning.",
            "price": 41.50,
            "category_id": 5
        },
        {
            "name": "Acqua di Giò Eau de Toilette",
            "image_url": "https://media.ulta.com/i/ulta/2023546?w=720",
            "description": "ARMANI Acqua di Giò Eau de Toilette is a savory men's cologne that captures the pure freshness and warmth of the Mediterranean Sea.",
            "price": 75.00,
            "category_id": 5
        },
        {
            "name": "L'Homme Eau de Toilette",
            "image_url": "https://media.ulta.com/i/ulta/2206526?w=720",
            "description": "Yves Saint Laurent L'Homme Eau de Toilette is a citrus and woody men's perfume featuring luxurious notes of bergamot, ginger, and vetiver.",
            "price": 97.00,
            "category_id": 5
        },
        {
            "name": "Sauvage Eau de Toilette",
            "image_url": "https://media.ulta.com/i/ulta/2299553?w=720",
            "description": "A radically fresh composition, Dior Sauvage Eau de Toilette opens with radiant top notes of Calabrian Bergamot, before Amberwood unleashes its powerfully woody trail. A Sauvage cologne for men inspired by wide-open spaces under a blue sky that dominates a white-hot desert landscape.",
            "price": 112.00,
            "category_id": 5
        },
        {
            "name": "Legend Gift Set",
            "image_url": "https://media.ulta.com/i/ulta/2571758?w=720",
            "description": "Experience the modern and timeless scent with this festive Montblanc Legend Gift Set.",
            "price": 93.00,
            "category_id": 5
        },
        {
            "name": "Industrial Strength Hand Healer",
            "image_url": "https://media.ulta.com/i/ulta/2211504?w=720",
            "description": "Jack Black's Industrial Strength Hand Healer is a non-greasy formula providing instant relief for dry, chapped, or cracked hands.",
            "price": 15.00,
            "category_id": 5
        },
        {
            "name": "NightMode Lip Treatment",
            "image_url": "https://media.ulta.com/i/ulta/2586974?w=720",
            "description": "Jack Black's NightMode Lip Treatment is a rich, emollient formula that provides soothing, replenishing hydration while you sleep. This overnight repairing treatment for dry lips is free of synthetic flavor and is preservative free.",
            "price": 10.00,
            "category_id": 5
        },
        {
            "name": "Black Reserve Hydrating Body Lotion",
            "image_url": "https://media.ulta.com/i/ulta/2572271?w=720",
            "description": "Jack Black's Black Reserve Hydrating Body Lotions is a rich, emollient moisturizer featuring a nourishing, hydrating blend of Shea Butter and Olive Oil.",
            "price": 32.00,
            "category_id": 5
        },
    ]

    for p in products:
        db.session.add(Product(**p))

    db.session.commit()


# Uses a raw SQL query to TRUNCATE the users table.
# SQLAlchemy doesn't have a built in function to do this
# TRUNCATE Removes all the data from the table, and RESET IDENTITY
# resets the auto incrementing primary key, CASCADE deletes any
# dependent entities
def undo_products():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
