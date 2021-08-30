export default class ObjectCleaner {
  static #redundantFields = [];
  static #object = {};

  static getFilteredFields(objectsProps, payload = {}) {
    const ObjectValues = Object.values(payload);
    const propsRedundantcies = this.#hasRedundantProps(payload);
    Object.keys(objectsProps).forEach(field => {
      Object.getOwnPropertyNames(payload).forEach((payloadField, payloadFieldIdx) => {
        if (field === payloadField) {
          this.#object[payloadField] = ObjectValues[payloadFieldIdx];
        }

        //2nd Level
        if (typeof ObjectValues[payloadFieldIdx] === 'object') {
          const payloadObjectFields = ObjectValues[payloadFieldIdx];
          const payloadObjectValues = Object.values(payloadObjectFields);
          Object.getOwnPropertyNames(payloadObjectFields).forEach(
            (payloadObjectField, payloadObjectFieldIdx) => {
              if (field === payloadObjectField) {
                let isRedundantProp = false;
                propsRedundantcies.forEach(redundancyProp => {
                  if (redundancyProp === payloadObjectField) {
                    return (isRedundantProp = true);
                  }
                });

                if (!isRedundantProp) {
                  this.#object[payloadObjectField] =
                    payloadObjectValues[payloadObjectFieldIdx];
                }
              }
            },
          );
        }
      });
    });
    return this.#object;
  }

  static #hasRedundantProps(payload) {
    const fields = Object.getOwnPropertyNames(payload);
    Object.values(payload).forEach(payload => {
      if (typeof payload === 'object') {
        const payloadObjectFields = Object.getOwnPropertyNames(payload);
        fields.forEach(field => {
          payloadObjectFields.forEach(payloadObjectField => {
            if (field === payloadObjectField) {
              if (this.#redundantFields.length === 0) {
                return this.#redundantFields.push(field);
              }

              let isExist = false;
              this.#redundantFields.forEach(redundantField => {
                if (redundantField === payloadObjectField) {
                  isExist = true;
                }
              });

              if (!isExist) {
                return this.#redundantFields.push(field);
              }
              return;
            }
          });
        });
      }
    });
    return this.#redundantFields;
  }
}
