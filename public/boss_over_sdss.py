import matplotlib.pyplot as plt
from matplotlib.patches import Circle, Ellipse
import sys
import os
import yanny
import pyfits
import numpy as np

os.system("setup tree bosswork")

if ((os.environ).has_key("PLATELIST_DIR") == False):
	print '\nNote: $PLATELIST_DIR has not been defined. Try running "setup platelist" and try again.\n\n'
	sys.exit(1)
else:
	platePlansFile = os.environ["PLATELIST_DIR"] + "/platePlans.par"

if ((os.environ).has_key("BOSS_SPECTRO_REDUX") == False):
	print '\nNote: $BOSS_SPECTRO_REDUX has not been defined. Try running "setup tree bosswork" and try again.\n\n'
	sys.exit(1)
else:
	bossPlatelistFile = os.environ["BOSS_SPECTRO_REDUX"] + "/platelist.fits"

plateListHDUList = pyfits.open(bossPlatelistFile)
done_boss_plates = []
for ind in range(len(plateListHDUList[1].data.field('STATUS1D'))):
	run1dst = plateListHDUList[1].data.field('STATUS1D')[ind].lower() == 'done'
	run2dst = plateListHDUList[1].data.field('STATUS2D')[ind].lower() == 'done'
	combinest = plateListHDUList[1].data.field('STATUSCOMBINE')[ind].lower() == 'done'
	is_boss = plateListHDUList[1].data.field('SURVEY')[ind].lower() == 'boss'
	
	if run1dst and run2dst and combinest and is_boss:
		done_boss_plates.append(plateListHDUList[1].data.field('PLATE')[ind])
	else:
		print "Plate: %i not done" % plateListHDUList[1].data.field('PLATE')[ind]

# Read plateplans from file.
platePlansYanny = yanny.yanny(platePlansFile)
platePlans = platePlansYanny.list_of_dicts('PLATEPLANS') # returns an array of dictionary objects

boss_plates = []
boss_not_done = []
sdss_plates = []

for pp in platePlans:
	if pp['survey'].lower() == "sdss" or "segue" in pp['survey'].lower():
		sdss_plates.append(((pp['raCen']+75)%360, pp['decCen']))
	elif pp['survey'].lower() == 'boss':
		if pp['plateid'] in done_boss_plates:
			boss_plates.append(((pp['raCen']+75)%360, pp['decCen']))
		else:
			boss_not_done.append(((pp['raCen']+75)%360, pp['decCen']))

fig = plt.figure(figsize=(14,5))
ax = fig.add_subplot(111)

for sdss_plate in sdss_plates:
	ra,dec = sdss_plate
       	print "RA: %.3f, Dec: %.3f" % (ra, dec)
       	cir = Ellipse((ra,dec), 3/np.cos(dec*np.pi/180), 3, fill=False, ec='b')
       	ax.add_patch(cir)

for boss_plate in boss_not_done:
	ra,dec = boss_plate
       	print "RA: %.3f, Dec: %.3f" % (ra, dec)
       	cir3 = Ellipse((ra,dec), 3/np.cos(dec*np.pi/180), 3, fill=False, ec='r', alpha=0.4)
       	ax.add_patch(cir3)

for boss_plate in boss_plates:
	ra,dec = boss_plate
       	print "RA: %.3f, Dec: %.3f" % (ra, dec)
       	#cir2 = Circle((ra/np.cos(dec*np.pi/180),dec), radius=1.5, fill=False, ec='g', alpha=0.6)
       	cir2 = Ellipse((ra,dec), 3/np.cos(dec*np.pi/180), 3, fill=False, ec='g', alpha=0.6)
       	ax.add_patch(cir2)

# Kepler Field
kepler = Ellipse(((290.667+75)%360.0,44.5), 10.0/np.cos(44.5*np.pi/180), 10, fill=True, ec='c', color='c', alpha=0.5)
ax.add_patch(kepler)

ax.set_xlim([360, 0])
ax.set_ylim([-20, 90])

ax.set_xlabel("RA + 75 (degrees)")
ax.set_ylabel("Dec (degrees)")

fig.legend((cir,cir2,cir3, kepler),("SDSS", "BOSS (completed)", "BOSS (drilled)", "Kepler Field"))

fig.savefig("boss_over_sdss.png", dpi=100)
