<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:xalan="http://xml.apache.org/xslt"
	xmlns:helper="xalan://com.farata.cdb.annotations.helper.AnnotationsHelper"
	xmlns:redirect="org.apache.xalan.lib.Redirect"
	extension-element-prefixes="redirect" exclude-result-prefixes="xalan redirect">

	<xsl:output omit-xml-declaration="yes" method="text" />

	<xsl:include href="generate-store.xsl" />
	<xsl:include href="generate-store-subclass.xsl" />

	<xsl:template name="generate-store-all.xsl">
		<xsl:param name="appName" />
		<xsl:param name="remoteActionNamespace" />
		<xsl:param name="outputFolder" />

		<xsl:for-each select="annotated-types/annotated-type">
			<xsl:variable name="interfaceName" select="@name" />
			<xsl:variable name="cxService"
				select="annotations/annotation[@name='clear.cdb.extjs.annotations.JSService']" />
			<xsl:if test="$cxService">
				<xsl:for-each select="methods/method">
					<xsl:variable name="generateStore"
						select="annotations/annotation[@name='clear.cdb.extjs.annotations.JSGenerateStore']" />
					<xsl:if test="$generateStore">
						<xsl:variable name="storeType"
							select="$generateStore/method[@name='storeType']/@value" />
						<xsl:variable name="fullStoreName">
							<xsl:choose>
								<xsl:when test="$storeType">
									<xsl:value-of select="$storeType" />
								</xsl:when>
								<xsl:otherwise>
									<xsl:variable name="fullDtoName"
										select="helper:getMethodTransferType($interfaceName, @name)" />
									<xsl:if test="$fullDtoName">
										<xsl:value-of select="helper:getStoreNameFull($fullDtoName)" />
									</xsl:if>
								</xsl:otherwise>
							</xsl:choose>
						</xsl:variable>
						<xsl:if test="$fullStoreName">
							<xsl:variable name="storeName"
								select="helper:getTypeName($fullStoreName)" />
							<xsl:variable name="rootPackage"
								select="helper:getPackageName($fullStoreName)" />
							<xsl:variable name="autoSyncEnabled">
								<xsl:variable name="jpqlMethodNode"
									select="annotations/annotation[@name='clear.cdb.extjs.annotations.JSJPQLMethod']" />
								<xsl:variable name="javaFillMethodNode"
									select="annotations/annotation[@name='clear.cdb.extjs.annotations.JSFillMethod']" />
								<xsl:variable name="updateInfo"
									select="annotations/annotation[@name='clear.cdb.extjs.annotations.JSUpdateInfo'] | $jpqlMethodNode/method[@name='updateInfo']/value/annotation" />
								<xsl:value-of
									select="boolean($updateInfo/method[@name='autoSyncEnabled']/@value = 'true') or boolean($javaFillMethodNode/method[@name='autoSyncEnabled']/@value = 'true')" />
							</xsl:variable>
							<xsl:variable name="typeName"
								select="helper:getTypeName($interfaceName)" />
							<xsl:variable name="serviceName"
								select="helper:createSubServiceName($typeName)" />
							<xsl:apply-templates select="/" mode="store-output">
								<xsl:with-param name="rootPackage" select="$rootPackage" />
								<xsl:with-param name="interfaceName" select="$interfaceName" />
								<xsl:with-param name="fillMethodName" select="@name" />
								<xsl:with-param name="storeName" select="$storeName" />
								<xsl:with-param name="autoSyncEnabled" select="$autoSyncEnabled" />
								<xsl:with-param name="appName" select="$appName" />
								<xsl:with-param name="remoteActionNamespace"
									select="$remoteActionNamespace" />
								<xsl:with-param name="serviceName" select="$serviceName" />
								<xsl:with-param name="outputFolder" select="$outputFolder" />
							</xsl:apply-templates>
						</xsl:if>
					</xsl:if>
				</xsl:for-each>
			</xsl:if>
		</xsl:for-each>
	</xsl:template>

	<xsl:template match="/" mode="store-output">
		<xsl:param name="rootPackage" />
		<xsl:param name="interfaceName" />
		<xsl:param name="fillMethodName" />
		<xsl:param name="storeName" />
		<xsl:param name="autoSyncEnabled" />
		<xsl:param name="appName" />
		<xsl:param name="remoteActionNamespace" />
		<xsl:param name="serviceName" />
		<xsl:param name="outputFolder" />
		<xsl:variable name="fullStoreName"
			select="concat($rootPackage, '.', $storeName)" />
		<xsl:variable name="genFileName"
			select="concat($outputFolder, '/', helper:getStorePathByStoreName($fullStoreName), '/generated/_', $storeName, '.js')" />
		<redirect:write file="{$genFileName}">
			<xsl:call-template name="generate-store.xsl">
				<xsl:with-param name="rootPackage"
					select="concat($rootPackage, '.generated')" />
				<xsl:with-param name="interfaceName" select="$interfaceName" />
				<xsl:with-param name="fillMethodName" select="$fillMethodName" />
				<xsl:with-param name="storeName" select="concat('_', $storeName)" />
				<xsl:with-param name="autoSyncEnabled" select="$autoSyncEnabled" />
				<xsl:with-param name="appName" select="$appName" />
				<xsl:with-param name="remoteActionNamespace" select="$remoteActionNamespace" />
				<xsl:with-param name="serviceName" select="$serviceName" />
			</xsl:call-template>
		</redirect:write>

		<xsl:variable name="subclassFileName"
			select="concat($outputFolder, '/', helper:getStorePathByStoreName($fullStoreName), '/', $storeName, '.js')" />
		<xsl:if test="not(helper:fileExists($subclassFileName))">
			<redirect:write file="{$subclassFileName}">
				<xsl:call-template name="generate-store-subclass.xsl">
					<xsl:with-param name="rootPackage" select="$rootPackage" />
					<xsl:with-param name="storeName" select="$storeName" />
					<xsl:with-param name="appName" select="$appName" />
				</xsl:call-template>
			</redirect:write>
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>