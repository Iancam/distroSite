# encoding: UTF-8
# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20160224185603) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "distributions", force: :cascade do |t|
    t.string   "contact_name"
    t.datetime "creation_date"
    t.string   "final_quote_id"
    t.integer  "po_number"
    t.integer  "address_id"
    t.integer  "district_id"
    t.integer  "school_id"
    t.integer  "teacher_grades_id"
    t.integer  "student_grades_id"
    t.datetime "created_at",        null: false
    t.datetime "updated_at",        null: false
  end

  create_table "districts", force: :cascade do |t|
    t.integer  "pid"
    t.string   "name"
    t.string   "state"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "iready_products", force: :cascade do |t|
    t.integer  "reo_id"
    t.string   "subject"
    t.string   "tier"
    t.string   "isbn"
    t.integer  "sch_price"
    t.string   "license_length"
    t.string   "grade_range"
    t.string   "product"
    t.string   "license_type"
    t.string   "prefix"
    t.string   "suffix"
    t.datetime "created_at",     null: false
    t.datetime "updated_at",     null: false
  end

  create_table "schools", force: :cascade do |t|
    t.integer  "pid"
    t.string   "name"
    t.integer  "enrollment"
    t.string   "street"
    t.string   "city"
    t.string   "state"
    t.integer  "zip"
    t.integer  "district_id"
    t.datetime "created_at",  null: false
    t.datetime "updated_at",  null: false
  end

  create_table "users", force: :cascade do |t|
    t.string   "email"
    t.string   "password_salt"
    t.string   "password_digest"
    t.datetime "created_at",      null: false
    t.datetime "updated_at",      null: false
  end

end
