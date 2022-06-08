<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="indigo" dark v-bind="attrs" v-on="on"> Edit News </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Edit News</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-text-field
                  v-model="editedTitle"
                  :counter="60"
                  label="*Title"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="editedDescription"
                  counter
                  required
                  label="*Description"
                ></v-textarea>
              </v-col>
              <v-col>
                <v-text-field
                  v-model="editedImageUrl"
                  label="Image url"
                ></v-text-field>
                <div class="form-img">
                  <img :src="editedImageUrl" height="250" />
                </div>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="editedLocation"
                  :counter="60"
                  label="*Location"
                  required
                >
                </v-text-field>
              </v-col>
              <v-col>
                <v-dialog
                  ref="dialog"
                  v-model="modal"
                  :return-value.sync="date"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="date"
                      label="Picker in dialog"
                      prepend-icon="mdi-calendar"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    scrollable
                    header-color="indigo"
                    color="indigo"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="indigo" @click="modal = false">
                      Cancel
                    </v-btn>
                    <v-btn text color="indigo" @click="$refs.dialog.save(date)">
                      OK
                    </v-btn>
                  </v-date-picker>
                </v-dialog>
                <v-dialog
                  ref="dialogTime"
                  v-model="modal2"
                  :return-value.sync="time"
                  persistent
                  width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="time"
                      label="Picker in dialog"
                      prepend-icon="mdi-clock-time-four-outline"
                      readonly
                      v-bind="attrs"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-if="modal2"
                    v-model="time"
                    full-width
                    header-color="indigo"
                    color="indigo"
                  >
                    <v-spacer></v-spacer>
                    <v-btn text color="indigo" @click="modal2 = false">
                      Cancel
                    </v-btn>
                    <v-btn
                      text
                      color="indigo"
                      @click="$refs.dialogTime.save(time)"
                    >
                      OK
                    </v-btn>
                  </v-time-picker>
                </v-dialog>
              </v-col>
            </v-row>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="saveChanges"> Save </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>
<script>
export default {
  name: "EditEvent",
  props: ["event"],
  data() {
      return{
    dialog: false,
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
    modal: false,
    modal2: false,
    editedTitle: this.event.title,
    editedDescription: this.event.description,
    editedLocation: this.event.location,
    editedImageUrl: this.event.imageUrl,
    editedDate: this.event.date,
    editedTime: this.event.time
    }
  },
  methods: {
    saveChanges() {
      this.dialog = false;
      this.$store.dispatch('updateMeetupData', {
          id: this.meetup.id,
          title: this.editedTitle,
          description: this.editedDescription
        })
    },
  },
};
</script>
