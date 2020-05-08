import pyrebase
import dfsapi
from collections import defaultdict
import dbtools

import loaddb

from instructor import Instructor
from institution import Institution

def read_instructors():
	db = dfsapi.get_db()

	instructors = list()

	data = db.child("instructors").get()

	for i in data.each():
		instructor = i.val()

		Name = instructor["Name"]
		Gender = instructor["Gender"]
		Ethnicity = instructor["Ethnicity"]
		Region = instructor["Region"]
		University = instructor["University"]
		Year = instructor["Year"]
		PreviousMentor = instructor["PreviousMentor"]
		Car = instructor["Car"]
		Languages = instructor["Languages"]
		ShirtSize = instructor["ShirtSize"]
		MultipleDays = instructor["MultipleDays"]
		Mon = dbtools.minute_range(instructor["Monday"])
		Tue = dbtools.minute_range(instructor["Tuesday"])
		Wed = dbtools.minute_range(instructor["Wednesday"])
		Thurs = dbtools.minute_range(instructor["Thursday"])
		Fri = dbtools.minute_range(instructor["Friday"])

		Schedule = defaultdict(list)
		
		if Mon != None:
			Schedule[1].append(Mon)
		if Tue != None:
			Schedule[2].append(Tue)
		if Wed != None:
			Schedule[3].append(Wed)
		if Thurs != None:
			Schedule[4].append(Thurs)
		if Fri != None:
			Schedule[5].append(Fri)

		instructors.append(Instructor(Name, Gender, Ethnicity, Region,
			University, Year, PreviousMentor, Schedule,
			Car, Languages, ShirtSize, MultipleDays))

	return instructors

def read_institutions():
	db = dfsapi.get_db()

	institutions = list()

	data = db.child("institutions").get()

	for i in data.each():
		institution = i.val()

		Name = institution["Name"]
		Address = institution["Address"]
		County = institution["County"]
		Program = institution["Program"]
		Instructors = institution["Instructors"]

		Mon = dbtools.minute_range(institution["Monday"])
		Tue = dbtools.minute_range(institution["Tuesday"])
		Wed = dbtools.minute_range(institution["Wednesday"])
		Thurs = dbtools.minute_range(institution["Thursday"])
		Fri = dbtools.minute_range(institution["Friday"])

		Schedule = defaultdict(list)
		
		if Mon != None:
			Schedule[1].append(Mon)
		if Tue != None:
			Schedule[2].append(Tue)
		if Wed != None:
			Schedule[3].append(Wed)
		if Thurs != None:
			Schedule[4].append(Thurs)
		if Fri != None:
			Schedule[5].append(Fri)

		institutions.append(Institution(Name, Address, County, Program, 
			Instructors, Schedule))

	return institutions

#Test
'''
i1 = read_instructors()
i2 = read_institutions()

d1 = loaddb.load_instructor_data("instructors.xlsx")
d2 = loaddb.load_institution_data("institutions.xlsx")
'''