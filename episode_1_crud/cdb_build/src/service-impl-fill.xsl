<?xml version="1.0" encoding="UTF-8"?>
<xsl:stylesheet version="2.0"
	xmlns:xsl="http://www.w3.org/1999/XSL/Transform"
	xmlns:xalan="http://xml.apache.org/xslt" exclude-result-prefixes="xalan"
	xmlns:helper="xalan://com.farata.cdb.annotations.helper.AnnotationsHelper">
	
	<xsl:output omit-xml-declaration="yes" method="text"/>	
	
	<xsl:template match="/|/|/" name="service-impl-fill.xsl">
		<xsl:param name="interfaceName"/>
		<xsl:param name="methodNode"/>
		<xsl:param name="springEnabled"/>

		<xsl:variable name="javaFillMethod" select="helper:getMethodAnnotation($interfaceName, $methodNode/@name, 'clear.cdb.extjs.annotations.JSFillMethod')"/>
		<xsl:variable name="javaAutoSyncEnabled" select="boolean($javaFillMethod/method[@name='autoSyncEnabled']/@value = 'true')"/>
		<xsl:variable name="javaSync" select="boolean($javaFillMethod/method[@name='sync']/@value = 'true')"/>
	@DirectMethod
	public <xsl:value-of select="$methodNode/@to-string"/> {
		return null;
	}
		<xsl:if test="$javaSync">
 	@DirectMethod
	public List&lt;ChangeObject&gt; <xsl:value-of select="$methodNode/@name"/>_insertItems(List&lt;ChangeObject&gt; items) throws Exception {
        List&lt;ChangeObject&gt; list = new ArrayList&lt;ChangeObject&gt;();
    	Iterator&lt;ChangeObject&gt; iterator = items.iterator();
		while (iterator.hasNext()) {
			clear.data.ChangeObject co = (clear.data.ChangeObject)deserializeObject((Map&lt;String, String&gt;)iterator.next(),clear.data.ChangeObject.class);
            if(co.isCreate()) {
            	<xsl:value-of select="$methodNode/@name"/>_doCreate(co);
            	list.add(co);
            }	       	
        }					
		return list;				
	} 	

	@DirectMethod
	public List&lt;ChangeObject&gt; <xsl:value-of select="$methodNode/@name"/>_updateItems(List&lt;ChangeObject&gt; items) throws Exception {
        List&lt;ChangeObject&gt; list = new ArrayList&lt;ChangeObject&gt;();
        
    	Iterator&lt;ChangeObject&gt; iterator = items.iterator();
		while (iterator.hasNext()) {
			clear.data.ChangeObject co = (clear.data.ChangeObject)deserializeObject((Map&lt;String, String&gt;)iterator.next(),clear.data.ChangeObject.class);
			if(co.isUpdate()) {
				<xsl:value-of select="$methodNode/@name"/>_doUpdate(co);
				list.add(co);
			}	       	
		}						
		return list;		
	} 	

	@DirectMethod
	public List&lt;ChangeObject&gt; <xsl:value-of select="$methodNode/@name"/>_deleteItems(List&lt;ChangeObject&gt; items) throws Exception {
		List&lt;ChangeObject&gt; list = new ArrayList&lt;ChangeObject&gt;();
		Iterator&lt;ChangeObject&gt; iterator = items.iterator();
		while (iterator.hasNext()) {
			clear.data.ChangeObject co = (clear.data.ChangeObject)deserializeObject((Map&lt;String, String&gt;)iterator.next(),clear.data.ChangeObject.class);
			if (co.isDelete()) {
            	<xsl:value-of select="$methodNode/@name"/>_doDelete(co);
            	list.add(co);
            }	       	
        }					
		return list;
	} 	

	public void <xsl:value-of select="$methodNode/@name"/>_doCreate(ChangeObject changeObject) {
	}
	
	public void <xsl:value-of select="$methodNode/@name"/>_doUpdate(ChangeObject changeObject) {
	}

	public void <xsl:value-of select="$methodNode/@name"/>_doDelete(ChangeObject changeObject) {
	}
		</xsl:if>
	</xsl:template>
</xsl:stylesheet>