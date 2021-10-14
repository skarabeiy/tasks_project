package itransition.project.user.model;

public enum Role {
    ROLE_USER("ROLE_USER"),
    ROLE_ADMIN("ROLE_ADMIN");

    private String value;

    public String getValue() {
        return value;
    }

    Role(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return value;
    }
}
