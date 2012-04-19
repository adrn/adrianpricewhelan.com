function dec2sex(dec) {
	h = parseInt(dec);
	m = parseInt((dec - parseFloat(h)) * 60.0);
	s = parseInt((dec - parseFloat(h) - parseFloat(m)/60.0) * 3600.0);
	
	return [h, m, s];
}

function getLST(lonW) {
	var now = new Date();
	h = now.getUTCHours();
	m = now.getUTCMinutes();
	s = now.getUTCSeconds();
	d = now.getUTCDate();
	mo = now.getMonth() + 1;
	y = now.getUTCFullYear();

	if (mo == 1 || mo == 2) {
		yprime = y - 1;
		mprime = mo + 12;
	}
	else {
		yprime = y;
		mprime = mo;
	}
	
	if (y > 1582 || (y == 1582 && (mo >= 10 && d >= 15))) {
		A = yprime / 100;
		B = parseInt(2.0 - parseFloat(A) + parseInt(A/4));
	}
	else
		B = 0;
	
	if (yprime < 0) 
		C = parseInt((365.25*parseFloat(yprime)) - 0.75);
	else
		C = parseInt(365.25*parseFloat(yprime));
	
	D = parseInt(30.6001 * (parseFloat(mprime) + 1.0))
	
	jd = B + C + D + d + 1720994.5;
	
	S = jd - 2451545.0;
	T = S / 36525.0;
	T0 = 6.697374558 + (2400.051336 * T) + (0.000025862 * Math.pow(T,2));
	T0 = T0 % 24;
	
	UT = (parseFloat(h) + parseFloat(m)/60.0 + parseFloat(s)/3600.0) * 1.002737909;
	T0 += UT;
	
	GST = T0 % 24;
	LST = GST - (lonW / 15.0);
	
	while (LST < 0.0) {
		LST += 24.0;
	}
	
	return LST;
	
}