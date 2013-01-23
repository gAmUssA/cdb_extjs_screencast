<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xalan="http://xml.apache.org/xslt"
	xmlns:helper="xalan://com.farata.cdb.annotations.helper.AnnotationsHelper"
	xmlns:redirect="org.apache.xalan.lib.Redirect"
	extension-element-prefixes="redirect" exclude-result-prefixes="xalan redirect">

	<xsl:output omit-xml-declaration="yes" method="text" />

	<xsl:include href="generate-model.xsl" />
	<xsl:include href="generate-model-subclass.xsl" />

	<xsl:template name="generate-model-all.xsl">
		<xsl:param name="outputFolder" />
		<xsl:param name="appName" select="$appName" />
		<xsl:param name="force" />

		<xsl:value-of select="helper:clearDTOMappings()" />
		<xsl:for-each select="annotated-types/dto-mappings/dto-mapping">
			<xsl:value-of select="helper:addDTOMapping(@dto-name, @entity-name)" />
		</xsl:for-each>
		<xsl:for-each select="annotated-types/annotated-type">
			<xsl:variable name="interfaceName" select="@name" />
			<xsl:variable name="cxService"
				select="annotations/annotation[@name='clear.cdb.extjs.annotations.JSService']" />
			<xsl:if test="$cxService">
				<xsl:for-each select="methods/method">
					<xsl:variable name="returnType"
						select="helper:getMethodReturnType($interfaceName, @name)" />
					<xsl:variable name="typeParameter"
						select="helper:getTypeParameter($returnType)" />
					<xsl:choose>
						<xsl:when test="$typeParameter and $typeParameter != '?'">
						</xsl:when>
						<xsl:otherwise>
							<xsl:variable name="fullDtoName"
								select="helper:getMethodTransferType($interfaceName, @name)" />
							<xsl:variable name="isEntity"
								select="helper:typeAnnotatedWith($fullDtoName, 'javax.persistence.Entity')" />
							<xsl:choose>
								<xsl:when test="$isEntity or not($fullDtoName)"></xsl:when>
								<xsl:otherwise>
									<xsl:apply-templates select="/" mode="output">
										<xsl:with-param name="outputFolder" select="$outputFolder" />
										<xsl:with-param name="force" select="$force" />
										<xsl:with-param name="dtoName"
											select="concat('_', helper:getTypeName($fullDtoName))" />
										<xsl:with-param name="subclassDtoName"
											select="helper:getTypeName($fullDtoName)" />
										<xsl:with-param name="rootPackage"
											select="concat(helper:getPackageName($fullDtoName), '.', 'gen')" />
										<xsl:with-param name="subclassRootPackage"
											select="helper:getPackageName($fullDtoName)" />
										<xsl:with-param name="interfaceName" select="$interfaceName" />
										<xsl:with-param name="methodName" select="@name" />
										<xsl:with-param name="appName" select="$appName" />
									</xsl:apply-templates>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:otherwise>
					</xsl:choose>
				</xsl:for-each>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>
	<xsl:template match="/" mode="output">
		<xsl:param name="outputFolder" />
		<xsl:param name="force" />
		<xsl:param name="dtoName" />
		<xsl:param name="subclassDtoName" />
		<xsl:param name="rootPackage" />
		<xsl:param name="subclassRootPackage" />
		<xsl:param name="interfaceName" />
		<xsl:param name="methodName" />

		<xsl:variable name="fullDtoName" select="concat($rootPackage, '/', $dtoName)" />
		<xsl:variable name="fileName"
			select="concat($outputFolder, '/', helper:replaceAll($fullDtoName, '.', '/'), '.js')" />
		<redirect:write file="{$fileName}">
			<xsl:call-template name="generate-model.xsl">
				<xsl:with-param name="dtoName" select="$dtoName" />
				<xsl:with-param name="rootPackage" select="$rootPackage" />
				<xsl:with-param name="interfaceName" select="$interfaceName" />
				<xsl:with-param name="methodName" select="$methodName" />
				<xsl:with-param name="appName" select="$appName" />
			</xsl:call-template>
		</redirect:write>
		<xsl:variable name="subclassFullDtoName"
			select="concat($subclassRootPackage, '/', $subclassDtoName)" />
		<xsl:variable name="subclassFileName"
			select="concat($outputFolder, '/', helper:replaceAll($subclassFullDtoName, '.', '/'), '.js')" />
		<xsl:if test="not(helper:fileExists($subclassFileName))">
			<redirect:write file="{$subclassFileName}">
				<xsl:call-template name="generate-model-subclass.xsl">
					<xsl:with-param name="dtoName" select="$subclassDtoName" />
					<xsl:with-param name="rootPackage" select="$subclassRootPackage" />
					<xsl:with-param name="appName" select="$appName" />
				</xsl:call-template>
			</redirect:write>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>