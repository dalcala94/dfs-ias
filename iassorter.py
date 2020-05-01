import loaddb
#import geocoder

from collections import defaultdict

from instructor import Instructor
from institution import Institution
from match import Match


def sort(instructorfp, institutionfp):
	instructors = loaddb.load_instructor_data(instructorfp)	
	institutions = loaddb.load_institution_data(institutionfp)

	result = defaultdict(list)

	for s in institutions:
		for t in instructors:
			sched_match = same_schedule_region(s, t)
			if sched_match != {}:
				result[s.name].append(Match(t.name, s.name, t.region, 
					t.previousmentor, t.car, t.languages, 
					t.multipledays, sched_match, s.instructors))

	print("RESULT BEFORE TRUNCATION:")
	print_result(result)
	print()
	print("RESULT AFTER TRUNCATION:")
	randInstructToSchool(result)

'''
Creates a new dictionary of matching schedules between the 
institutions and the instructors if the region and time range 
match for the corresponding day by comparing every instructor 
to every institution.
'''
def same_schedule_region(school : Institution, teacher : Instructor) -> dict:

	sched_match = defaultdict(list)

	for day in school.schedule:
		for school_time in school.schedule[day]:
			for teacher_time in teacher.schedule[day]:
				if time_match(school_time, teacher_time) and same_region(school, teacher):
					sched_match[day].append(school_time)

	return sched_match 

'''
Matches time schedule of the school and the time schedule 
of the teacher. If the time range of the school is within the 
time range of the teacher then True is returned else False. 
'''
def time_match(school : (int,int), teacher : (int, int)) -> bool:
	return teacher[0] <= school[0] and teacher[1] >= school[1]

'''
Matches the region of the school with the region of the teacher.
If there is a match True is returned else False. 
'''
def same_region(school : Institution, teacher : Instructor) -> bool:
	return school.county == teacher.region


def print_result(result : dict):
	for school in result:
		print(school, ':', end =' ')
		for match in result[school]:
			print(match.teacher_name + ",", end=' ')
		print()

#Code heavily relies on Min and Appurva's initial matching algorithms...
#function to randomely choose List.length() numer of times to assign/finalize matched instructors to a school in the region.
#possible to teach multiple days (scheduled for x # of different schools on different days as pertaining to the instructors available data.)
#@param passed in region dictionary with school objects as keys and a List() of matched instructors as values.
#@return a dict with the proposed instructor assignment to matched school keys
def randInstructToSchool(instsAndInstructors: dict) -> dict:

	#Empty result dict. Result will be populated with school as keys and List() of instructors as values.
	resultDict = {}

	#print("First part for just testing purposes!")
	#Assuming List() associated with a school in this region are not the same...?
	# for key in instsAndInstructors:
	# 	print(instsAndInstructors[key])
	# 	listLength = instsAndInstructors[key].numOfInstructors
	# 	instructors_for_school = instsAndInstructors[key]
	# 	print("School " + key + " Needs: " + str(listLength) + " Instructors!")
	# 	print()
	
	for school in instsAndInstructors:
		print(school, ':', end =' ')
		for match in instsAndInstructors[school]:
			school_instructors_required = match.numOfInstructors
			break
		match_number = 0
		for match in instsAndInstructors[school]:
                                     if match_number==school_instructors_required:
                                             break
                                     print(match.teacher_name + ",", end=' ')
                                     match_number+=1
		print()
		#for match in instsAndInstructors[school]:
    			#print("School " + school + " Needs: " + str(match.numOfInstructors) + " Instructors!")





	
	

	



###Testing randInstructToSchool() functionality. (Run in python shell)###
#Reading input params seperately. (WORKS)
# ocList = ["Jimmy", "Rick", "Eliza", "Beck", "Audrey", "Dan"]
# ocReg = dict(Lathrop= ocList, Carr= ocList, Prentice= ocList)
# print(ocReg)
# randInstructToSchool(ocReg)

#Reading keys as objects and values as lists. (WORKS)
# dummyList = [Instructor("Daniel", "M", "M", "OC", "UCI", 2021, "N", "M W Th", "Y", "Eng", "L", "N"), Instructor("Julian", "M", "M", "OC", "UCI", 2021, "N", "M W Th", "Y", "Eng", "L", "N")]
# key1 = Institution("Lathrop", "112 Apple", "App", "OC", 1, "M W")
# key2 = Institution("Carr", "28 Bahia", "App", "OC", 1, "T Th")
# key3 = Institution("Prentice", "242 Alton", "App", "OC", 1, "M F")
# dummyDict = dict(key1= dummyList, key2= dummyList, key3= dummyList) #if printed, only lists object name keys and associated value address locations in memory.
#randInstructToSchool(dummyDict) #Output for dummyDict: {key1: [Instructor("Daniel", "M", "M", "OC", "UCI", 2021, "N", "M W Th", "Y", "Eng", "L", "N"), Instructor("Julian", "M", "M", "OC", "UCI", 2021, "N", "M W Th", "Y", "Eng", "L", "N")], key2: [], key3: []} 


