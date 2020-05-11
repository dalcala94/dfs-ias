import pyrebase
import dfsapi
import iassorter

from match import Match

def upload_matches():
	result = iassorter.sort()

	db = dfsapi.get_db()
	
	uploaded = set()

	for school in result:
		#for match in result[school]:
		i=0
		count=0
		while count < 4:
			match_dict = match_to_dict(result[school][i])

			teacher = match_dict["TeacherName"]

			if teacher not in uploaded:
				uploaded.add(teacher)
				db.child("sortedroster").child(school).child(teacher).set(match_dict)
				count += 1

			i += 1

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