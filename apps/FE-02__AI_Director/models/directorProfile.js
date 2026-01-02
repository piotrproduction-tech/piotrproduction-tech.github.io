export class DirectorProfile {
  constructor({
    id,
    name,
    style,
    priorityWeights,
    triggerSensitivity,
    preferredActions,
    decisionMatrix
  }) {
    this.id = id;
    this.name = name;
    this.style = style;
    this.priorityWeights = priorityWeights;
    this.triggerSensitivity = triggerSensitivity;
    this.preferredActions = preferredActions;
    this.decisionMatrix = decisionMatrix;
  }
}