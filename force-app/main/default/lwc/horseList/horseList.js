import { LightningElement, wire } from 'lwc';
import { NavigationMixin } from 'lightning/navigation';
import getHorses from '@salesforce/apex/HorseController.getHorses';
import imageComingSoon from '@salesforce/resourceUrl/imageComingSoon';

export default class HorseList extends NavigationMixin(LightningElement) {
    @wire(getHorses)
    horses;
    placeholderImageUrl = imageComingSoon;
    
navigateToRecordPage(event) {
    event.preventDefault();
    const horseId = event.currentTarget.dataset.id;
    this[NavigationMixin.GenerateUrl]({
        type: 'standard__webPage',
        attributes: {
            url: `/s/horse/${horseId}`
        },
    })
    .then(url => {
        window.open(url);
    });
}
}