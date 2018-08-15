class Api::ContactsController < ApplicationController
  def one_contact_action
    @contact = Contact.first
    render "one_contact_view.json.jbuilder"
  end

  def all_contacts_action
    @contacts = Contact.all
    render "all_contacts_view.json.jbuilder"
  end

  def index
    @contacts = Contact.all
    render 'index.json.jbuilder'
  end

  def show
    @contact = Contact.find_by(id: params[:id])
    render 'show.json.jbuilder'
  end

  def create
    @contact = Contact.new(
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email],
      phone_number: params[:phone_number]
    )
    @contact.save
    render 'show.json.jbuilder'
  end

  def update
    # grab the contact from the db
    @contact = Contact.find_by(id: params[:id])
    # update the contact
    @contact.update(
      first_name: params[:first_name],
      last_name: params[:last_name],
      email: params[:email],
      phone_number: params[:phone_number]
    )
    render 'show.json.jbuilder'
  end
end
