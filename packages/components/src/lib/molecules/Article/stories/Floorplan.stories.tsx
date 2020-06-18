import React, { ReactElement } from 'react'
import { Floorplan, FloorplanProps } from '../Article'

/**
 * @file Stories - Floorplan
 * @module Stories/Components/Molecules/Article/Floorplan
 */

export default {
  component: Floorplan,
  title: 'Components/Molecules/Article/Floorplan'
}

/**
 * Default {@link Floorplan} story.
 */
export const Default = (args: FloorplanProps): ReactElement<FloorplanProps> => (
  <Floorplan {...args} />
)

Default.args = {
  aptWithPlan: {
    Amenities: '',
    ApartmentId: '18168076',
    ApartmentName: '9W0316',
    ApplyOnlineURL:
      'https://901wdc.securecafe.com/onlineleasing/901-w-street-nw-washington-dc-20001/oleapplication.aspx?stepname=RentalOptions&myOlePropertyId=1131409&FloorPlanID=3215320&UnitID=18168076&header=1',
    AvailabilityURL:
      'https://901wdc.securecafe.com/onlineleasing/901-w-street-nw-washington-dc-20001/oleapplication.aspx?stepname=Apartments&myOlePropertyId=1131409&floorPlans=3215320',
    AvailableDate: '4/17/2020',
    AvailableUnitsCount: '1',
    Baths: '1.00',
    Beds: '1',
    Deposit: '0',
    FloorplanHasSpecials: '0',
    FloorplanId: '3215320',
    FloorplanImageAltText: '',
    FloorplanImageName: '901W_Floorplan_PNG_800x800_A01[1].png',
    FloorplanImageURL:
      'https://cdn.rentcafe.com/dmslivecafe/3/1131409/901W_Floorplan_PNG_800x800_A01[1].png',
    FloorplanName: 'A01',
    MaximumDeposit: '0',
    MaximumRent: '2670.00',
    MaximumSQFT: '613',
    MinimumDeposit: '0',
    MinimumRent: '2670.00',
    MinimumSQFT: '613',
    PropertyId: '1131409',
    PropertyShowsSpecials: '0',
    SQFT: '613',
    Specials: '',
    UnitImageAltText: '',
    UnitImageURLs: [''],
    UnitStatus: 'Vacant Unrented Not Ready',
    UnitTypeMapping: '9w-a01',
    VoyagerPropertyCode: '248203',
    VoyagerPropertyId: '4382'
  }
}
