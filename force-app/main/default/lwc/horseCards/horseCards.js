import { LightningElement, track, wire } from 'lwc';
import getHorses from '@salesforce/apex/HorseController.getHorses';

export default class horseCards extends LightningElement {
    @track horsesGroupedByPartnership = [];
    selectedStatus = [];
    statusOptions = [/* add your status options here e.g. { label: 'Active', value: 'Active' } */];

    @wire(getHorses, { statusFilter: '$selectedStatus' })
    wiredHorses({ error, data }) {
        if (data) {
            // Logic to group horses by Partnership__r.Name
            let groupedData = {};
            data.forEach(horse => {
                if (!groupedData[horse.Partnership__r.Name]) {
                    groupedData[horse.Partnership__r.Name] = [];
                }
                groupedData[horse.Partnership__r.Name].push(horse);
            });
            this.horsesGroupedByPartnership = Object.keys(groupedData).map(partnership => {
                return {
                    partnership: partnership,
                    horses: groupedData[partnership]
                };
            });
        } else if (error) {
            console.error('Error fetching horses:', error);
        }
    }

    handleStatusChange(event) {
        this.selectedStatus = event.detail.value;
    }
}
