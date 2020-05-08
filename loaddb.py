import xlrd

from collections import defaultdict
import dbtools

from instructor import Instructor
from institution import Institution

'''
Opens excel file and reads the instructor roster.
Creates Instructor object with necessary information and appends
it to a list of instructors. 
The list of instructors is returned.
'''
def load_instructor_data(filepath):
	workbook = xlrd.open_workbook(filepath)
	sheet = workbook.sheet_by_index(0)
	sheet.cell_value(0,0)

	instructors = list()

	for i in range(1, sheet.nrows):
		Name = sheet.cell_value(i,0)
		Gender = sheet.cell_value(i,1)
		Ethnicity = sheet.cell_value(i,2)
		Region = sheet.cell_value(i,3)
		University = sheet.cell_value(i,4)
		Year = sheet.cell_value(i,5)
		PreviousMentor = sheet.cell_value(i,6)
		Car = sheet.cell_value(i,7)
		Languages = sheet.cell_value(i,8)
		ShirtSize = sheet.cell_value(i,9)
		MultipleDays = sheet.cell_value(i,10)

		Schedule = defaultdict(list)

		Mon = dbtools.minute_range(sheet.cell_value(i,11))
		Tue = dbtools.minute_range(sheet.cell_value(i,12))
		Wed = dbtools.minute_range(sheet.cell_value(i,13))
		Thurs = dbtools.minute_range(sheet.cell_value(i,14))
		Fri = dbtools.minute_range(sheet.cell_value(i,15))

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

		'''
		make_schedule(Schedule, (900,1020), build_list_int_days(sheet.cell_value(i,7)))
		make_schedule(Schedule, (930,1050), build_list_int_days(sheet.cell_value(i,8)))
		make_schedule(Schedule, (945,1065), build_list_int_days(sheet.cell_value(i,9)))
		'''

		#update_schedule(Schedule)

		instructors.append(Instructor(Name, Gender, Ethnicity, Region,
			University, Year, PreviousMentor, Schedule,
			Car, Languages, ShirtSize, MultipleDays))

	return instructors

'''
Opens excel file and reads the instutition database. 
Creates Institution object with necessary information as 
attributes and appends it to a list of institutions. 
The list of institutions is returned. 
'''
def load_institution_data(filepath):
	workbook = xlrd.open_workbook(filepath)
	sheet = workbook.sheet_by_index(0)
	sheet.cell_value(0,0)

	institutions = list()

	for i in range(1, sheet.nrows):
		Name = sheet.cell_value(i,0)
		Address = sheet.cell_value(i,1)
		County = sheet.cell_value(i, 2)
		Program = sheet.cell_value(i,3)
		Instructors = sheet.cell_value(i,4)

		Schedule = defaultdict(list)

		Mon = dbtools.minute_range(sheet.cell_value(i,5))
		Tue = dbtools.minute_range(sheet.cell_value(i,6))
		Wed = dbtools.minute_range(sheet.cell_value(i,7))
		Thurs = dbtools.minute_range(sheet.cell_value(i,8))
		Fri = dbtools.minute_range(sheet.cell_value(i,9))

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

		'''
		make_schedule(Schedule, TimeRange, 
			build_list_int_days(sheet.cell_value(i,5)))
		'''
		#update_schedule(Schedule)

		institutions.append(Institution(Name, Address, County, Program, 
			Instructors, Schedule))

	return institutions


#TOOLS FOR MAKING SCHEDULE

'''
Represent schedule in a dictionary. 
Keys are the days of the week in int. 
Values are lists of time ranges.
'''

#TESTING

'''
instructors = load_instructor_data("shortinstructors.xlsx")	
institutions = load_institution_data("schoolsample.xlsx")
load_instructor_data("instructors.xlsx")
load_institution_data("institutions.xlsx")
'''