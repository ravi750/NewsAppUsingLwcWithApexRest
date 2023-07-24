public with sharing class newsController {
    
    @AuraEnabled
    public static Map<String, Object> retriveNews(){
        String endPoint = 'https://newsapi.org/v2/everything?q=tesla&from=2023-06-24&sortBy=publishedAt&apiKey=319998b103d54d1e959eeb9edef51fef';
        HttpRequest httpReq = new HttpRequest();
        httpReq.setEndPoint(endPoint);
        httpReq.setMethod('GET');

        Map<String,Object> newsJsonData = new Map<String,Object>();
        String strRes = null;

        try{
            Http http = new Http();
            HttpResponse httpRes = http.send(httpReq);

            if(httpRes.getStatuscode() == 200){
                strRes = httpRes.getBody();
            }
            else{
                throw new CalloutException(httpRes.getBody());
            }
        }
        catch(Exception ex){
            System.debug('Exception=== '+ex);
        }

        if(!String.isBlank(strRes)){
            newsJsonData = (Map<String,Object>)JSON.deserializeUntyped(strRes);
        }

        if(!newsJsonData.isEmpty()){
            return newsJsonData;
        }
        else{
            return null;
        }
    }
}