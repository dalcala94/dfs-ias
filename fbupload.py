import pyrebase
import xlrd
import dfsapi

'''
Upload CSV roster of institutions to the 
realtime database in firebase
'''
def upload_institutions(filepath):
	db = dfsapi.get_db()
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
		Mon = sheet.cell_value(i,5)
		Tue = sheet.cell_value(i,6)
		Wed = sheet.cell_value(i,7)
		Thurs = sheet.cell_value(i,8)
		Fri = sheet.cell_value(i,9)

		school = {"Name":Name, "Address":Address, "County":County,
			"Program":Program, "Instructors":Instructors, 
			"Monday" : Mon, "Tuesday":Tue, "Wednesday":Wed, 
			"Thursday":Thurs, "Friday":Fri}

		db.child("institutions").child(Name).set(school)






