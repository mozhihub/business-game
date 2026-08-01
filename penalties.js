// Penalties, Bonuses, and Lucky Cards Data

const penaltiesData = [
    { id: 1, title: 'Income Tax', titleTA: 'வருமான வரி', amount: 200, description: 'Annual income tax payment', riskLevel: 'orange' },
    { id: 2, title: 'Property Tax', titleTA: 'சொத்து வரி', amount: 150, description: 'Property assessment', riskLevel: 'yellow' },
    { id: 3, title: 'GST Penalty', titleTA: 'ஜிஎஸ்டி அபராதம்', amount: 300, description: 'Late GST filing', riskLevel: 'red' },
    { id: 4, title: 'Business Loss', titleTA: 'தொழில் இழப்பு', amount: 400, description: 'Quarterly loss', riskLevel: 'critical' },
    { id: 5, title: 'Electricity Bill', titleTA: 'மின்சார கட்டணம்', amount: 180, description: 'Monthly charges', riskLevel: 'green' },
    { id: 6, title: 'Maintenance', titleTA: 'பராமரிப்பு', amount: 220, description: 'Property maintenance', riskLevel: 'yellow' },
    { id: 7, title: 'Traffic Fine', titleTA: 'போக்குவரத்து அபராதம்', amount: 120, description: 'Violation fine', riskLevel: 'green' },
    { id: 8, title: 'Hospital', titleTA: 'மருத்துவமனை', amount: 350, description: 'Medical expenses', riskLevel: 'red' },
    { id: 9, title: 'Flood Damage', titleTA: 'வெள்ள சேதம்', amount: 500, description: 'Repair costs', riskLevel: 'critical' },
    { id: 10, title: 'Cyber Attack', titleTA: 'சைபர் தாக்குதல்', amount: 450, description: 'Security breach', riskLevel: 'critical' },
    { id: 11, title: 'Water Bill', titleTA: 'தண்ணீர் கட்டணம்', amount: 100, description: 'Water charges', riskLevel: 'green' },
    { id: 12, title: 'Insurance', titleTA: 'காப்பீடு', amount: 280, description: 'Insurance premium', riskLevel: 'orange' },
    { id: 13, title: 'License Fee', titleTA: 'உரிம கட்டணம்', amount: 150, description: 'Business license', riskLevel: 'yellow' },
    { id: 14, title: 'Fuel Cost', titleTA: 'எரிபொருள்', amount: 200, description: 'Vehicle fuel', riskLevel: 'yellow' },
    { id: 15, title: 'Staff Salary', titleTA: 'ஊழியர் சம்பளம்', amount: 350, description: 'Monthly salary', riskLevel: 'orange' },
    { id: 16, title: 'Rent Payment', titleTA: 'வாடகை', amount: 300, description: 'Office rent', riskLevel: 'orange' },
    { id: 17, title: 'Legal Fees', titleTA: 'வழக்கு கட்டணம்', amount: 400, description: 'Lawyer fees', riskLevel: 'red' },
    { id: 18, title: 'Equipment Repair', titleTA: 'உபகரண சரிசெய்தல்', amount: 250, description: 'Repair costs', riskLevel: 'yellow' },
    { id: 19, title: 'Marketing Cost', titleTA: 'மார்க்கெட்டிங்', amount: 280, description: 'Advertisement', riskLevel: 'orange' },
    { id: 20, title: 'Software License', titleTA: 'மென்பொருள் உரிமம்', amount: 250, description: 'Software renewal', riskLevel: 'orange' }
];

const bonusData = [
    { id: 1, title: 'Lottery Win', titleTA: 'லாட்டரி வெற்றி', amount: 500, description: 'Lucky draw prize' },
    { id: 2, title: 'Business Profit', titleTA: 'தொழில் லாபம்', amount: 400, description: 'Quarterly profit' },
    { id: 3, title: 'Investment Return', titleTA: 'முதலீடு திரும்ப', amount: 350, description: 'ROI received' },
    { id: 4, title: 'Govt Subsidy', titleTA: 'அரசு மானியம்', amount: 300, description: 'Subsidy grant' },
    { id: 5, title: 'Festival Bonus', titleTA: 'விழா போனஸ்', amount: 250, description: 'Festival reward' },
    { id: 6, title: 'Tax Refund', titleTA: 'வரி திரும்ப', amount: 200, description: 'Tax refund' },
    { id: 7, title: 'Contract Win', titleTA: 'ஒப்பந்த வெற்றி', amount: 450, description: 'New contract' },
    { id: 8, title: 'Inheritance', titleTA: 'பரம்பரை', amount: 600, description: 'Family inheritance' },
    { id: 9, title: 'Stock Profit', titleTA: 'பங்கு லாபம்', amount: 380, description: 'Stock market gain' },
    { id: 10, title: 'Bonus Check', titleTA: 'போனஸ் காசோலை', amount: 300, description: 'Unexpected bonus' }
];

const luckyCardsData = [
    { id: 1, title: 'Bank Error', titleTA: 'வங்கி பிழை', amount: 100, type: 'positive', description: 'Bank error in your favor' },
    { id: 2, title: 'Speeding Fine', titleTA: 'வேக அபராதம்', amount: -100, type: 'negative', description: 'Speeding ticket' },
    { id: 3, title: 'Beauty Contest', titleTA: 'அழகு போட்டி', amount: 150, type: 'positive', description: 'Won beauty contest' },
    { id: 4, title: 'Doctor Fee', titleTA: 'மருத்துவ கட்டணம்', amount: -100, type: 'negative', description: 'Doctor visit' },
    { id: 5, title: 'Inheritance', titleTA: 'பரம்பரை சொத்து', amount: 200, type: 'positive', description: 'Relative inheritance' },
    { id: 6, title: 'Pay School', titleTA: 'பள்ளி கட்டணம்', amount: -150, type: 'negative', description: 'School fees' },
    { id: 7, title: 'Christmas Bonus', titleTA: 'கிறிஸ்துமஸ் போனஸ்', amount: 100, type: 'positive', description: 'Holiday bonus' },
    { id: 8, title: 'Car Repair', titleTA: 'கார் சரிசெய்தல்', amount: -100, type: 'negative', description: 'Car broke down' },
    { id: 9, title: 'Life Insurance', titleTA: 'ஆயுள் காப்பீடு', amount: 100, type: 'positive', description: 'Insurance matured' },
    { id: 10, title: 'Luxury Tax', titleTA: 'ஆடம்பர வரி', amount: -100, type: 'negative', description: 'Luxury purchase tax' }
];