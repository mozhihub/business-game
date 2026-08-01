// Business Empire India - Cities Data
const citiesData = [
    { id: 1, name: 'Chennai', nameTA: 'சென்னை', price: 400, rent: 20, color: '#FF6B6B' },
    { id: 2, name: 'Coimbatore', nameTA: 'கோயம்புத்தூர்', price: 350, rent: 18, color: '#4ECDC4' },
    { id: 3, name: 'Madurai', nameTA: 'மதுரை', price: 300, rent: 15, color: '#45B7D1' },
    { id: 4, name: 'Salem', nameTA: 'சேலம்', price: 280, rent: 14, color: '#96C93D' },
    { id: 5, name: 'Trichy', nameTA: 'திருச்சி', price: 260, rent: 13, color: '#F7B731' },
    { id: 6, name: 'Mumbai', nameTA: 'மும்பை', price: 420, rent: 21, color: '#A55EEA' },
    { id: 7, name: 'Delhi', nameTA: 'டெல்லி', price: 400, rent: 20, color: '#FD79A8' },
    { id: 8, name: 'Bangalore', nameTA: 'பெங்களூரு', price: 380, rent: 19, color: '#00D26A' },
    { id: 9, name: 'Hyderabad', nameTA: 'ஐதராபாத்', price: 360, rent: 18, color: '#FF6B6B' },
    { id: 10, name: 'Pune', nameTA: 'புணே', price: 340, rent: 17, color: '#4ECDC4' },
    { id: 11, name: 'Kolkata', nameTA: 'கொல்கத்தா', price: 340, rent: 17, color: '#45B7D1' },
    { id: 12, name: 'Ahmedabad', nameTA: 'அகமதாபாத்', price: 330, rent: 17, color: '#96C93D' },
    { id: 13, name: 'Jaipur', nameTA: 'ஜெய்ப்பூர்', price: 320, rent: 16, color: '#F7B731' },
    { id: 14, name: 'Lucknow', nameTA: 'லக்னோ', price: 290, rent: 15, color: '#A55EEA' },
    { id: 15, name: 'Goa', nameTA: 'கோவா', price: 370, rent: 19, color: '#FD79A8' },
    { id: 16, name: 'Kochi', nameTA: 'கொச்சி', price: 300, rent: 15, color: '#00D26A' },
    { id: 17, name: 'Noida', nameTA: 'நொய்டா', price: 330, rent: 17, color: '#4ECDC4' },
    { id: 18, name: 'Gurgaon', nameTA: 'குர்கிராம்', price: 350, rent: 18, color: '#45B7D1' },
    { id: 19, name: 'Surat', nameTA: 'சூரத்', price: 310, rent: 16, color: '#96C93D' },
    { id: 20, name: 'Indore', nameTA: 'இந்தூர்', price: 270, rent: 14, color: '#F7B731' },
    { id: 21, name: 'Bhopal', nameTA: 'போபால்', price: 260, rent: 13, color: '#A55EEA' },
    { id: 22, name: 'Patna', nameTA: 'பாட்னா', price: 240, rent: 12, color: '#FD79A8' },
    { id: 23, name: 'Ranchi', nameTA: 'ராஞ்சி', price: 240, rent: 12, color: '#00D26A' },
    { id: 24, name: 'Chandigarh', nameTA: 'சண்டிகர்', price: 310, rent: 16, color: '#FF6B6B' },
    { id: 25, name: 'Guwahati', nameTA: 'கவுகாத்தி', price: 240, rent: 12, color: '#4ECDC4' },
    { id: 26, name: 'Shillong', nameTA: 'ஷில்லாங்', price: 250, rent: 13, color: '#45B7D1' },
    { id: 27, name: 'Srinagar', nameTA: 'ஸ்ரீநகர்', price: 290, rent: 15, color: '#96C93D' },
    { id: 28, name: 'Jammu', nameTA: 'ஜம்மு', price: 260, rent: 13, color: '#F7B731' },
    { id: 29, name: 'Dehradun', nameTA: 'டெஹ்ரடூன்', price: 270, rent: 14, color: '#A55EEA' },
    { id: 30, name: 'Bhubaneswar', nameTA: 'புவனேஸ்வர்', price: 250, rent: 13, color: '#FD79A8' },
    { id: 31, name: 'Raipur', nameTA: 'ராய்ப்பூர்', price: 230, rent: 12, color: '#00D26A' },
    { id: 32, name: 'Nagpur', nameTA: 'நாக்பூர்', price: 270, rent: 14, color: '#FF6B6B' },
    { id: 33, name: 'Nashik', nameTA: 'நாசிக்', price: 230, rent: 12, color: '#4ECDC4' },
    { id: 34, name: 'Varanasi', nameTA: 'வாராணசி', price: 250, rent: 13, color: '#45B7D1' },
    { id: 35, name: 'Mysore', nameTA: 'மைசூர்', price: 290, rent: 15, color: '#96C93D' },
    { id: 36, name: 'Thiruvananthapuram', nameTA: 'திருவனந்தபுரம்', price: 280, rent: 14, color: '#F7B731' },
    { id: 37, name: 'Visakhapatnam', nameTA: 'விசாகப்பட்டினம்', price: 310, rent: 16, color: '#A55EEA' },
    { id: 38, name: 'Vijayawada', nameTA: 'விஜயவாடா', price: 280, rent: 14, color: '#FD79A8' },
    { id: 39, name: 'Erode', nameTA: 'ஈரோடு', price: 200, rent: 10, color: '#00D26A' },
    { id: 40, name: 'Tirunelveli', nameTA: 'திருநெல்வேலி', price: 240, rent: 12, color: '#FF6B6B' }
];

const specialTiles = [
    { id: 'railway1', name: 'Railway Stn', nameTA: 'ரயில் நிலையம்', price: 200, rent: 25, type: 'railway', icon: '🚂' },
    { id: 'railway2', name: 'Railway Stn', nameTA: 'ரயில் நிலையம்', price: 200, rent: 25, type: 'railway', icon: '🚆' },
    { id: 'railway3', name: 'Railway Stn', nameTA: 'ரயில் நிலையம்', price: 200, rent: 25, type: 'railway', icon: '🚇' },
    { id: 'railway4', name: 'Railway Stn', nameTA: 'ரயில் நிலையம்', price: 200, rent: 25, type: 'railway', icon: '🚊' },
    { id: 'airport1', name: 'Airport', nameTA: 'விமான நிலையம்', price: 250, rent: 30, type: 'airport', icon: '✈️' },
    { id: 'airport2', name: 'Airport', nameTA: 'விமான நிலையம்', price: 250, rent: 30, type: 'airport', icon: '🛫' }
];

const upgradeLevels = [
    { name: 'Land', nameTA: 'நிலம்', multiplier: 1, icon: '🏞️', upgradeCost: 0 },
    { name: 'House', nameTA: 'வீடு', multiplier: 2, icon: '🏠', upgradeCost: 100 },
    { name: 'Shop', nameTA: 'கடை', multiplier: 3, icon: '🏪', upgradeCost: 200 },
    { name: 'Mall', nameTA: 'மால்', multiplier: 4, icon: '🏬', upgradeCost: 300 },
    { name: 'Hotel', nameTA: 'ஹோட்டல்', multiplier: 5, icon: '🏨', upgradeCost: 400 },
    { name: 'Smart City', nameTA: 'ஸ்மார்ட் சிட்டி', multiplier: 6, icon: '🌆', upgradeCost: 500 }
];

const cornerTiles = [
    { id: 0, name: 'START', nameTA: 'தொடக்கம்', icon: '🏁', type: 'start' },
    { id: 13, name: 'JAIL', nameTA: 'சிறை', icon: '🔒', type: 'jail' },
    { id: 26, name: 'PARKING', nameTA: 'நிறுத்தம்', icon: '🅿️', type: 'parking' },
    { id: 39, name: 'GO TO JAIL', nameTA: 'சிறைக்கு செல்', icon: '👮', type: 'gotojail' }
];

const chanceTiles = [
    { id: 5, name: 'Chance', nameTA: 'வாய்ப்பு', icon: '❓', type: 'chance' },
    { id: 18, name: 'Chance', nameTA: 'வாய்ப்பு', icon: '❓', type: 'chance' },
    { id: 31, name: 'Chance', nameTA: 'வாய்ப்பு', icon: '❓', type: 'chance' }
];

const taxTiles = [
    { id: 8, name: 'Income Tax', nameTA: 'வருமான வரி', amount: 200, icon: '📋', type: 'tax' },
    { id: 21, name: 'Luxury Tax', nameTA: 'ஆடம்பர வரி', amount: 150, icon: '💎', type: 'tax' }
];