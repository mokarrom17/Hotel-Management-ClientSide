const Faq = () => {
  return (
    <div className="mb-12 px-4 md:px-12 lg:px-20">
      <div className="text-center">
        <h2 className="font-bold text-2xl md:text-4xl lg:text-6xl text-white">
          FAQ
        </h2>
        <p className="font-semibold text-md md:text-lg lg:text-xl text-white mb-6">
          Please check the question and answer. If any further issues occured,
          <br className="hidden md:block" />
          please contact with us, we will solve the issue in correct time.
        </p>
      </div>
      <div className="flex flex-col lg:flex-row justify-between items-center lg:items-start gap-6 lg:gap-10">
        <div className="w-full lg:w-1/2">
          <div className="collapse collapse-plus bg-base-200 mb-3">
            <input type="checkbox" name="my-accordion-3" />
            <div className="collapse-title text-lg lg:text-xl font-medium">
              What are the check-in and check-out times?
            </div>
            <div className="collapse-content">
              <p>
                Check-in is typically at [X] PM, and check-out is at [Y] AM.
                Early check-in and late check-out may be available upon request.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-3 ">
            <input type="checkbox" name="my-accordion-3" />
            <div className="collapse-title text-lg lg:text-xl te font-medium">
              Is breakfast included in the room rate?
            </div>
            <div className="collapse-content">
              <p>
                Breakfast may be included in certain packages or room rates.
                Please check your booking details or contact the front desk for
                more information.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-3">
            <input type="checkbox" name="my-accordion-3" />
            <div className="collapse-title text-lg lg:te te font-medium">
              Is parking available at the hotel?
            </div>
            <div className="collapse-content">
              <p>
                Yes, we offer [complimentary/paid] parking for our guests. Valet
                parking may also be available.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-3">
            <input type="checkbox" name="my-accordion-3" />
            <div className="collapse-title text-lg lg:te te font-medium">
              Does the hotel have Wi-Fi, and is it free?
            </div>
            <div className="collapse-content">
              <p>
                Yes, we offer complimentary Wi-Fi access throughout the hotel,
                including guest rooms and public areas.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-3">
            <input type="checkbox" name="my-accordion-3" />
            <div className="collapse-title text-lg lg:te te font-medium">
              Do you offer airport shuttle service?
            </div>
            <div className="collapse-content">
              <p>
                Yes, we provide a [complimentary/paid] shuttle service to and
                from the airport. Please contact us in advance to arrange your
                pickup.
              </p>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="collapse collapse-plus bg-base-200 mb-3">
            <input type="checkbox" name="my-accordion-3" />
            <div className="collapse-title text-lg lg:te te font-medium">
              Are pets allowed at the hotel?
            </div>
            <div className="collapse-content">
              <p>
                [Yes/No], pets are [welcome/not allowed]. If allowed, please
                inquire about any associated fees or special policies.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-3">
            <input type="checkbox" name="my-accordion-3" />
            <div className="collapse-title text-lg lg:te te font-medium">
              What amenities are available at the hotel?
            </div>
            <div className="collapse-content">
              <p>
                We offer a variety of amenities including a pool, fitness
                center, spa, on-site restaurant, and room service. Please visit
                our website or contact the front desk for more details.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-3">
            <input type="checkbox" name="my-accordion-3" />
            <div className="collapse-title text-lg lg:te te font-medium">
              Is there a cancellation policy?
            </div>
            <div className="collapse-content">
              <p>
                Yes, our cancellation policy varies depending on the rate plan.
                Please review your booking details or contact us for more
                information.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-3">
            <input type="checkbox" name="my-accordion-3" />
            <div className="collapse-title text-lg lg:text-xl  font-medium">
              Are there any additional fees or taxes?
            </div>
            <div className="collapse-content">
              <p>
                Additional fees and local taxes may apply depending on the rate
                and services used during your stay.
              </p>
            </div>
          </div>
          <div className="collapse collapse-plus bg-base-200 mb-3">
            <input type="checkbox" name="my-accordion-3" />
            <div className="collapse-title text-lg lg:text-xl font-medium">
              Can I store my luggage after check-out?
            </div>
            <div className="collapse-content">
              <p>
                Yes, we offer complimentary luggage storage for guests who have
                checked out but still wish to explore the area.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
