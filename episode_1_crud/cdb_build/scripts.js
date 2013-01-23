importClass(Packages.org.apache.tools.ant.types.Path);
importClass(java.lang.reflect.Method);
importClass(java.lang.System);
function reloadHelper() {
	loaderpath = new Path(project, project.getProperty("cp"));
	classloader = project.createClassLoader(loaderpath);
	hqlHelperClass = classloader
			.loadClass("com.farata.cdb.annotations.helper.HQLHelper");
	hqlHelper = hqlHelperClass.newInstance();
	annotationsHelperClass = classloader
			.loadClass("com.farata.cdb.annotations.helper.AnnotationsHelper");
	annotationsHelper = annotationsHelperClass.newInstance();
}

function generateDTOs() {
	reloadHelper();
	projectRoot = project.getProperty("project-root");
	entityNames = project.getProperty("annotated-types.annotated-type.name");
	if (!entityNames)
		return;

	var entityNamesArray = entityNames.split(",");
	var typesMap = "<types>\n";
	for (entity in entityNamesArray) {
		if (annotationsHelper.typeAnnotatedWith(entityNamesArray[entity],
				"javax.persistence.Entity")) {
			var packageName = annotationsHelper
					.getPackageName(entityNamesArray[entity]);
			var typeName = annotationsHelper
					.getTypeName(entityNamesArray[entity]);
			typesMap += '\t<type name="' + entityNamesArray[entity]
					+ '" toname="' + packageName + '.dto.' + typeName
					+ 'DTO"/>\n';
		}
	}
	typesMap += "</types>";

	for (entity in entityNamesArray) {
		if (annotationsHelper.typeAnnotatedWith(entityNamesArray[entity],
				"javax.persistence.Entity")) {
			var packageName = annotationsHelper
					.getPackageName(entityNamesArray[entity]);
			var typeName = annotationsHelper
					.getTypeName(entityNamesArray[entity]);

			var xslt = project.createTask("xslt");
			xslt.setIn(new java.io.File(projectRoot + "cdb_build/annotated.xml"));
			xslt.setStyle(projectRoot + "cdb_build/src/java-dto.xsl");
			xslt.setOut(new java.io.File(projectRoot + "/src/"
					+ packageName.replace('.', '/') + "/dto/" + typeName
					+ "DTO.java"));
			xslt.setClasspath(loaderpath);
			// java.lang.System.out.println(loaderpath);
			xslt.setForce(true);

			packageParam = xslt.createParam();
			packageParam.setName("rootPackage");
			packageParam.setExpression(packageName + ".dto");

			dtoNameParam = xslt.createParam();
			dtoNameParam.setName("dtoName");
			dtoNameParam.setExpression(typeName + "DTO");

			entityNameParam = xslt.createParam();
			entityNameParam.setName("entityName");
			entityNameParam.setExpression(entityNamesArray[entity]);

			typesMapParam = xslt.createParam();
			typesMapParam.setName("typesMap");
			typesMapParam.setExpression(typesMap);

			xslt.execute();
		}
	}
}

function generateServices() {
	reloadHelper();
	projectRoot = project.getProperty("project-root");
	entityNames = project.getProperty("annotated-types.annotated-type.name");
	var ret = "";
	if (!entityNames)
		return ret;

	var entityNamesArray = entityNames.split(",");
	for (entity in entityNamesArray) {
		if (annotationsHelper.typeAnnotatedWith(entityNamesArray[entity],
				"clear.cdb.extjs.annotations.JSService")) {
			var packageName = annotationsHelper
					.getPackageName(entityNamesArray[entity]);
			var typeName = annotationsHelper
					.getTypeName(entityNamesArray[entity]);

			// Name of generated service
			var genTypeName = createGenServiceName(typeName);

			var fileName = packageName.replace('.', '/') + "/generated/"
					+ genTypeName + ".java";
			var interfaceFileName = String(entityNamesArray[entity]).replace(
					/\./g, '/')
					+ ".java";
			var cmp = compareLastModified(projectRoot + "/src/" + fileName,
					projectRoot + "/src/" + interfaceFileName);
			// System.out.println(">>>>>>>>>>>>>>> " + cmp);
			if (cmp == 1 && !isForceBuild()) {
				continue;
			}
			var xslt = project.createTask("xslt");
			xslt.setIn(new java.io.File(projectRoot + "cdb_build/annotated.xml"));
			xslt.setStyle(projectRoot + "cdb_build/src/service-impl.xsl");

			ret += fileName + ",";
			xslt.setOut(new java.io.File(projectRoot + "/src/" + fileName));
			xslt.setClasspath(loaderpath);
			// java.lang.System.out.println(loaderpath);
			xslt.setForce(true);

			packageParam = xslt.createParam();
			packageParam.setName("rootPackage");
			packageParam.setExpression(packageName + ".generated");

			dtoNameParam = xslt.createParam();
			dtoNameParam.setName("serviceName");
			dtoNameParam.setExpression(genTypeName);

			entityNameParam = xslt.createParam();
			entityNameParam.setName("interfaceName");
			entityNameParam.setExpression(entityNamesArray[entity]);

			xslt.execute();
		}
	}
	return ret;
}

function getServices() {
	reloadHelper();
	projectRoot = project.getProperty("project-root");
	entityNames = project.getProperty("annotated-types.annotated-type.name");
	var ret = "";
	if (!entityNames)
		return ret;

	var entityNamesArray = entityNames.split(",");
	for (entity in entityNamesArray) {
		if (annotationsHelper.typeAnnotatedWith(entityNamesArray[entity],
				"clear.cdb.extjs.annotations.JSService")) {
			var packageName = annotationsHelper
					.getPackageName(entityNamesArray[entity]);
			var typeName = annotationsHelper
					.getTypeName(entityNamesArray[entity]);

			// Name of generated service
			var genTypeName = createGenServiceName(typeName);

			var fileName = packageName.replace('.', '/') + "/generated/"
					+ genTypeName + ".java";
			var interfaceFileName = String(entityNamesArray[entity]).replace(
					/\./g, '/')
					+ ".java";
			var cmp = compareLastModified(projectRoot + "/src/" + fileName,
					projectRoot + "/src/" + interfaceFileName);
			// System.out.println(">>>>>>>>>>>>>>> " + cmp);
			if (cmp == 1 && !isForceBuild()) {
				continue;
			}
			ret += fileName + ",";
		}
	}
	return ret;
}


function generateServicesSubclasses() {
	reloadHelper();
	projectRoot = project.getProperty("project-root");
	entityNames = project.getProperty("annotated-types.annotated-type.name");
	var ret = "";
	if (!entityNames)
		return ret;

	var entityNamesArray = entityNames.split(",");
	for (entity in entityNamesArray) {
		if (annotationsHelper.typeAnnotatedWith(entityNamesArray[entity],
				"clear.cdb.extjs.annotations.JSService")) {
			var packageName = annotationsHelper
					.getPackageName(entityNamesArray[entity]);
			var typeName = annotationsHelper
					.getTypeName(entityNamesArray[entity]);
			var subServiceName = createSubServiceName(typeName);
			var fileName = packageName.replace('.', '/') + "/" + subServiceName
					+ ".java";
			ret += fileName + ",";
			var outFile = new java.io.File(projectRoot + "/src/" + fileName);
			if (outFile.exists()) {
				continue;
			}

			var xslt = project.createTask("xslt");
			// java.lang.System.out.println(xslt);
			xslt.setIn(new java.io.File(projectRoot + "cdb_build/annotated.xml"));
			xslt.setStyle(projectRoot + "cdb_build/src/service-subclass.xsl");
			xslt.setOut(outFile);
			xslt.setClasspath(loaderpath);
			xslt.setForce(false);

			packageParam = xslt.createParam();
			packageParam.setName("rootPackage");
			packageParam.setExpression(packageName);

			dtoNameParam = xslt.createParam();
			dtoNameParam.setName("subServiceName");
			dtoNameParam.setExpression(subServiceName);

			dtoNameParam = xslt.createParam();
			dtoNameParam.setName("superServiceName");
			dtoNameParam.setExpression(createGenServiceName(typeName));

			entityNameParam = xslt.createParam();
			entityNameParam.setName("interfaceName");
			entityNameParam.setExpression(entityNamesArray[entity]);

			xslt.execute();
		}
	}
	return ret;
}

function getServicesSubclasses() {
	reloadHelper();
	projectRoot = project.getProperty("project-root");
	entityNames = project.getProperty("annotated-types.annotated-type.name");
	var ret = "";
	if (!entityNames)
		return ret;

	var entityNamesArray = entityNames.split(",");
	for (entity in entityNamesArray) {
		if (annotationsHelper.typeAnnotatedWith(entityNamesArray[entity],
				"clear.cdb.extjs.annotations.JSService")) {
			var packageName = annotationsHelper
					.getPackageName(entityNamesArray[entity]);
			var typeName = annotationsHelper
					.getTypeName(entityNamesArray[entity]);
			var subServiceName = createSubServiceName(typeName);
			var fileName = packageName.replace('.', '/') + "/" + subServiceName
					+ ".java";
			ret += fileName + ",";
		}
	}
	return ret;
}

function getServicesDTOs() {
	reloadHelper();
	var xslt = null;
	var projectRoot = project.getProperty("project-root");
	var entityNames = project
			.getProperty("annotated-types.annotated-type.name");

	var sessionFactoryCreated = false;
	var ret = "";
	if (!entityNames)
		return;

	var annotationNamesString = project
			.getProperty("annotated-types.annotated-type.annotations.annotation.name");
	var annotationNamesArray = annotationNamesString.split(",");
	var entityNamesArray = entityNames.split(",");
	for (entity in entityNamesArray) {
		if (String(annotationNamesArray[entity]) ==	"clear.cdb.extjs.annotations.JSService") {
			methods = annotationsHelper
					.getClassMethods(entityNamesArray[entity]);
			for (method in methods) {
				var returnType = annotationsHelper.getMethodReturnType(
						entityNamesArray[entity], "" + annotationsHelper.getMethodNameByMethod(methods[method]));
				var fullDtoName = annotationsHelper
						.getTypeParameter(returnType);

				if (!(isEmpty(fullDtoName) || fullDtoName == "?")) {
					continue;
				}
				fullDtoName = annotationsHelper.getMethodTransferType(
						entityNamesArray[entity], "" + annotationsHelper.getMethodNameByMethod(methods[method]));
				fullDtoName = String(fullDtoName);

				try {
					var isEntity = annotationsHelper.typeAnnotatedWith(
							fullDtoName, "javax.persistence.Entity");
					if (isEntity) {
						continue;
					}
				} catch (exc) {
				}
				if (!isEmpty(fullDtoName)) {
					var arr = fullDtoName.split(".");
					var packageName = "";
					var dtoName = "";
					if (arr.length > 1) {
						packageName = fullDtoName.substring(0, fullDtoName
								.lastIndexOf("."));
						dtoName = fullDtoName.substring(fullDtoName
								.lastIndexOf(".") + 1);
					} else {
						packageName = annotationsHelper
								.getPackageName(entityNamesArray[entity])
								+ ".dto";
						dtoName = fullDtoName;
					}
					dtoName = "_" + String(dtoName);
					packageName = String(packageName) + ".gen";
					var fileName = String(packageName).replace(/\./g, '/')
							+ "/" + dtoName + ".java";
					var interfaceFileName = String(entityNamesArray[entity])
							.replace(/\./g, '/')
							+ ".java";
					var cmp = compareLastModified(projectRoot + "/src/"
							+ fileName, projectRoot + "/src/"
							+ interfaceFileName);
					// System.out.println(">>>>>>>>>>>>>>> " + cmp);
//					if (cmp == 1 && !isForceBuild()) {
//						continue;
//					}
					ret += fileName + ",";
				}
			}
		}
	}
	return ret;
}

function getServicesDTOSubclasses() {
	var ret = "";
	reloadHelper();
	var projectRoot = project.getProperty("project-root");
	var entityNames = project
			.getProperty("annotated-types.annotated-type.name");
	if (!entityNames)
		return;

	var entityNamesArray = entityNames.split(",");
	for (entity in entityNamesArray) {
		if (annotationsHelper.typeAnnotatedWith(entityNamesArray[entity],
				"clear.cdb.extjs.annotations.JSService")) {
			methods = annotationsHelper
					.getClassMethods(entityNamesArray[entity]);
			for (method in methods) {

				var returnType = annotationsHelper.getMethodReturnType(
						entityNamesArray[entity], "" + annotationsHelper.getMethodNameByMethod(methods[method]));
				var fullDtoName = annotationsHelper
						.getTypeParameter(returnType);

				if (!(isEmpty(fullDtoName) || fullDtoName == "?")) {
					continue;
				}

				fullDtoName = annotationsHelper.getMethodTransferType(
						entityNamesArray[entity], "" + annotationsHelper.getMethodNameByMethod(methods[method]));
				fullDtoName = String(fullDtoName);

				try {
					var isEntity = annotationsHelper.typeAnnotatedWith(
							fullDtoName, "javax.persistence.Entity");
					if (isEntity) {
						continue;
					}
				} catch (exc) {
				}

				if (!isEmpty(fullDtoName)) {
					var arr = fullDtoName.split(".");
					var packageName = "";
					var dtoName = "";
					if (arr.length > 1) {
						packageName = fullDtoName.substring(0, fullDtoName
								.lastIndexOf("."));
						dtoName = fullDtoName.substring(fullDtoName
								.lastIndexOf(".") + 1);
					} else {
						packageName = annotationsHelper
								.getPackageName(entityNamesArray[entity])
								+ ".dto";
						dtoName = fullDtoName;
					}

					var fileName = String(packageName).replace(/\./g, '/')
							+ "/" + dtoName + ".java";
					var outFile = new java.io.File(projectRoot + "/src/"
							+ fileName);
					ret += fileName + ',';
				}
			}
		}
	}
	return ret;
}

function isEmpty(string) {
	return string == null || string == 'null' || string.length == 0;
}

function getFullDTOName(entityName, method) {
	fullDtoName = String(annotationsHelper.getMethodTransferType(entityName,
			method));
	return fullDtoName;
}

function createGenServiceName(serviceName) {
	var genTypeName = serviceName;
	if (String(genTypeName).substring(0, 1) == "I") {
		genTypeName = "_" + String(genTypeName).substring(1);
	} else {
		genTypeName = "_" + String(genTypeName) + "Impl";
	}
	// System.out.println(genTypeName);
	return genTypeName;
}

function createSubServiceName(serviceName) {
	var genTypeName = serviceName;
	if (String(genTypeName).substring(0, 1) == "I") {
		genTypeName = String(genTypeName).substring(1);
	} else {
		genTypeName = String(genTypeName) + "Impl";
	}
	// System.out.println(genTypeName);
	return genTypeName;
}

function createCollectionName(dtoName) {
	var collectionName = dtoName.replace(/(DTO)$/, "");
	collectionName = collectionName + "Collection";
	// System.out.println(collectionName);
	return collectionName;
}

function createCollectionPackageName(dtoPackageName) {
	var packageName = "collections";
	if (dtoPackageName.indexOf('.') != -1) {
		packageName = dtoPackageName.replace(/\.[^.]*$/, ".collections");
	}
	// System.out.println(packageName);
	return packageName;
}

var lastTime;
var lastPhase;
function startPhase(s) {
	lastPhase = s;
	lastTime = new Date().getTime();
	System.out.print(s + " " + lastTime + "/" + new Date().getSeconds() + ":"
			+ new Date().getMilliseconds());
}
function endPhase() {
	System.out.println(lastPhase + " duration :  "
			+ (new Date().getTime() - lastTime));
}

function compareLastModified(fileName1, fileName2) {
	var file1 = new java.io.File(fileName1);
	var file2 = new java.io.File(fileName2);
	if (!file1.exists() && !file2.exists()) {
		return 0;
	}
	if (file1.exists() && !file2.exists()) {
		return 1;
	}
	if (!file1.exists() && file2.exists()) {
		return -1;
	}
	var lastModified1 = file1.lastModified();
	var lastModified2 = file2.lastModified();
	if (lastModified1 > lastModified2) {
		return 1;
	} else {
		return -1;
	}

	return 0;
}
function isForceBuild() {
	return project.getProperty("force.build") == "true";	
}
