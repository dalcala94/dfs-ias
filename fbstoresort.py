import pyrebase
import dfsapi
import iassorter
import fbread
import shirtsize
import dfsapi
import calendar
import time

from match import Match

def upload_matches(program:str):

	instructors = fbread.read_instructors(program)
	institutions = fbread.read_institutions(program)

	result = iassorter.sort(instructors, institutions)
	
	timestamp = str(calendar.timegm(time.gmtime()))

	db = dfsapi.get_db()
		
	for school in result:
		for match in result[school]:
			match_dict = match_to_dict(match)
			db.child(program).child("matches").child(timestamp).child(school).child(match.teacher_name).set(match_dict)

	'''
	uploaded = set()
	for school in result:
		i=0
		count=0
		while count < 4:
			match_dict = match_to_dict(result[school][i])

			teacher = match_dict["TeacherName"]

			if teacher not in uploaded:
				uploaded.add(teacher)
				#db.child("sortedroster").child(school).child(teacher).set(match_dict)
				count += 1

			i += 1
	'''


def match_to_dict(match : Match) -> dict:
	match_dict = {"TeacherName" : match.teacher_name,
		"SchoolName" : match.school_name, 
		"Region" : match.region, 
		"PreviousMentor" : match.previous_mentor, 
		"Car" : match.car,
		"Languages" : match.languages, 
		"MultipleDays" : match.multiple_days, 
		"Schedule" : match.schedule
	}
	return match_dict
