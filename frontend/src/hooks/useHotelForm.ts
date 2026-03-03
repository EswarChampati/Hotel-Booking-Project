import { useForm } from "react-hook-form";
import { HotelFormData } from "./../types/user";
import { useEffect } from "react";

const useHotelForm = (
  onSave: (data: FormData) => void,
  hotel: HotelFormData
) => {
  const formMethods = useForm<HotelFormData>();
  const { handleSubmit, reset } = formMethods;
  useEffect(() => {
    reset(hotel);
  }, [hotel, reset]);

  const onSubmit = handleSubmit((FormDataJSON: HotelFormData) => {
    const formData = new FormData();
    formData.append("name", FormDataJSON.name);
    formData.append("city", FormDataJSON.city);
    formData.append("country", FormDataJSON.country);
    formData.append("description", FormDataJSON.description);
    formData.append("type", FormDataJSON.type);
    formData.append("adultCount", FormDataJSON.adultCount.toString());
    formData.append("starRating", FormDataJSON.starRating.toString());
    formData.append("childCount", FormDataJSON.childCount.toString());
    formData.append("pricePerNight", FormDataJSON.pricePerNight.toString());
    FormDataJSON.facilities.forEach((facility, index) => {
      formData.append(`facilities[${index}]`, facility);
    });
    Array.from(FormDataJSON.imageFiles).forEach((image) => {
      formData.append("imageFiles", image);
    });

    onSave(formData);
  });
  return { formMethods, onSubmit };
};

export default useHotelForm;
