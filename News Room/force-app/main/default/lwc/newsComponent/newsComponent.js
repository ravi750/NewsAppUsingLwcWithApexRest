import { LightningElement, track } from 'lwc';
import retriveNews from '@salesforce/apex/newsController.retriveNews';

export default class newsComponent extends LightningElement {
    @track result = [];
    @track selectedNews = {};

    @track isModalOpen = false;

    get modalClass(){
        return this.isModalOpen ? "slds-modal slds-fade-in-open" : "slds-modal" 
    }
    
    get modalBackdropClass(){
       return this.isModalOpen ? "slds-backdrop slds-backdrop_open" : "slds-backdrop"
    }

    connectedCallback(){
        this.fetchNews();
    }
    
    fetchNews(){
        retriveNews().then (response=>{
            console.log('res=== ',response);
            this.formatNewsData(response.articles);
        }).catch(error=>{
            console.error('error=== ',error);
        })
    }

    formatNewsData(response){
        this.result = response.map((item, index)=>{
            let id = `new_${index+1}`;
            let date = new Date(item.publishedAt).toDateString();
            let name = item.source.name;
            let description = item.description;
            return {...item, id:id, name:name, date:date, description:description}
        })
        console.log('result=== ',this.result)
    }

    showModal(event){
        let id = event.target.dataset.item;
        this.result.forEach(item=>{
            if(item.id === id){
                this.selectedNews = {...item}
            }
        })
        this.isModalOpen = true;
    }
    closeModal(){
        this.isModalOpen = false;
    }
}