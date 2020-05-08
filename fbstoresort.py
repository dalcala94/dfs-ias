import pyrebase
import dfsapi
import iassorter

from match import Match

def upload_matches():
	result = iassorter.sort()

	db = dfsapi.get_db()

	for school in result:
		for match in result[school]:
			match_dict = match_to_dict(match)
			db.child("sortedroster").child(match.school_name).set(match_dict)


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

upload_matches()