from functions import search_results, clean_data

if __name__ == '__main__':
    # please enter the number of pages you want to scan
    num_pages = int(input("Enter the number of pages you want to scan: "))
    face_shape = search_results(num_pages) # get the face shape

  
    # cleaning the data
    file_name = face_shape + '_glasses.csv'
    cleaned_data = clean_data(file_name)

    print(f"We have carefully made glasses recommendations for you and have saved the recommendations in {file_name}. You can open the file and review them.")
    # Filter results based on price
    print(f"For your simplicity, we allow filtering by price. If you want to filter the results by price, press 1 and Enter otherwise perss 0 and Enter.")
    user_response = input("Enter your response and press either 1 or 0 and Enter:")

    # Error checking, looping until user enters correct, required value
    while user_response not in ['1','0']:
        user_response = input("Enter your response and press either 1 or 0 and Enter:")
    
    good_columns = ['Glass Name', 'Price', 'Link']
    if user_response == '1':
        print("This is filter by price Feature. Enter your ranges now.")
        min_ = int(input("Please input your minimum price in dollars: $"))
        max_ = int(input("Please input your maximum price in dollars: $"))   
        filtered_data = cleaned_data[(cleaned_data['Price'] >= min_) & (cleaned_data['Price'] <= max_)]    
        print(f"Here are the glasses that fall within your price range of ${min_} and ${max_}:")
        print(filtered_data[good_columns])
    else:
        print("Thank you for using specommender. See you next time.")

    
